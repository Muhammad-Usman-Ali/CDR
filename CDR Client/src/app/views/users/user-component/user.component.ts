import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
// import { BaseServicesService } from 'src/app/services/base-services.service';
// import { usersApiService } from 'src/app/services/user-control.service';
import { Subscription } from 'rxjs';

import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
// import { MessageService } from 'primeng/api';
// import { animations } from 'src/app/animations';

import * as _ from 'lodash';
import { UsersApiService } from 'src/app/shared/services/api/users-api.service';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, map } from 'rxjs/operators';
import { User } from 'src/app/shared/interfaces';
import { isLoweredSymbol } from '@angular/compiler';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  // animations: [animations]
})
export class UserComponent implements OnInit, OnDestroy {

  loadingText = ''; // used in CRUD
  loading = false; //

  inputFieldAsPassword = true; // used for toggle text or password field type for password input

  modalFor: 'create' | 'edit' = 'create';

  searchControl: FormControl = new FormControl();
  // Creating Login form input elements

  userForm: FormGroup = this.createUserForm('create');

  formSubmitting = false;

  focusedUserId = '0';

  subscription: Subscription;
  usersArray = [];
  filteredUsersArray = [];
  groupOf = 'all';
  isUserPasswordInputTypeIsPassword = true;
  isPasswordInputShowPassword = false;

  // constructor(private messageService: MessageService, private modalService: NgbModal, private baseService: BaseServicesService, private usersApiService: usersApiService) { }
  constructor(
    private toastrService: ToastrService,
    // private messageService: MessageService,
    private modalService: NgbModal,
    // private baseService: BaseServicesService,
    private usersApiService: UsersApiService
    ) { }

  ngOnInit() {
    // this.baseService.changeTitle('Users'); // Changing the header title

    this.getUserList(); // fetching all user's list

    // attaching searchin ability
    this.searchControl.valueChanges
      // .pipe(map(() => { this.filteredUsersArray = []; }))
      .pipe(debounceTime(200))
      .subscribe(value => {
        this.filterData(value);
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  filterData(_val) {
    if (_val) { _val = _val.toLowerCase(); }

    const usersArray: User[] = _.cloneDeep(this.usersArray);

    this.filteredUsersArray = [];


    // setTimeout is required to show list of users correctly
    setTimeout(() => {
      console.log(_val);
      this.filteredUsersArray = usersArray.filter((_user) => _user.userName.toString().toLowerCase().indexOf(_val) > -1 );
    }, 0);

  }

  getUserList() {
    this.subscription = this.usersApiService.getUsersList()
      .subscribe((_data) => {
        this.usersArray = _data;
        this.filteredUsersArray = _.cloneDeep(this.usersArray);
      });
  }

  // getUsersArrayLength(_isAdmin) {
  //   if (_isAdmin != null) {
  //     if (_isAdmin) {
  //       return this.usersArray.filter((user: any) => user.isAdmin).length;
  //     } else if (!_isAdmin) {
  //       return this.usersArray.filter((user: any) => !user.isAdmin).length;
  //     }
  //   }
  // }



  // openModal(content) {

  //   this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then(
  //     (result) => {
  //     // console.log('results', result);
  //     // this.resetModal();
  //   }, (reason) => {
  //     this.resetModal(false);
  //   });
  // }

  createUser() {
    // this.formSubmitting = true;
    this.subscription = this.usersApiService.createUser(this.userForm.value)
      .subscribe(
        (_newUser) => {
          this.toastrService.clear();
          this.toastrService.success('', 'User created!', { timeOut: 3000, progressBar: true, positionClass: 'toast-top-center' });

          this.usersArray.unshift(_newUser);
          // this.filteredUsersArray.push(_newUser);
          this.hideLoader();
        },
        (err) => {
          if (err.error && err.error.name == 'SequelizeUniqueConstraintError') {
            this.toastrService.clear();
            this.toastrService.error('', 'Duplicate username found! Use another one.', { timeOut: 3000, progressBar: true, positionClass: 'toast-top-center' });

            // this.messageService.add({key: 'top-center', severity: 'error', summary: '', closable: false});
          } else {
            this.toastrService.clear();
            this.toastrService.error('', 'Error! Please try again.', { timeOut: 3000, progressBar: true, positionClass: 'toast-top-center' });

            // this.messageService.add({key: 'top-center', sticky: true, severity: 'error', summary: 'Error! Please try again.', closable: false});
          }
          this.hideLoader();

          // console.log(err);
          // this.resetModal(false);
        }
      );
    // this.modalService.dismissAll();
    // console.log(this.userForm.reset());
  }

  createEditModalClickFunction(_modalFor: 'create' | 'edit', _modal, _id?) {
    console.log(_modalFor, _id);

    this.isPasswordInputShowPassword = false;
    this.modalFor = _modalFor;

    this.userForm = this.createUserForm(_modalFor, _id);

    this.modalService.open(_modal, { ariaLabelledBy: 'modal-basic-title', centered: true })
      .result.then((result) => {

        this.loading = true;

        if (_modalFor == 'edit') {
          this.editUser(_id);
        } else {
          this.createUser();
        }
      },
      (reason) => {
      });
  }

  createUserForm(_modalFor: 'create' | 'edit', _userId?: number) {
    let userForm: FormGroup;
    let userObject: User;


    if (_modalFor == 'edit' && _userId) {
      let isUserIsMainAdmin;

      userObject = this.usersArray.find(_user => _user.id == _userId); // finding the user from usersarray
      isUserIsMainAdmin = userObject.userName.toUpperCase() == 'ADMIN'; // checking if main admin

      userForm = new FormGroup({
        userName: new FormControl({value: userObject.userName, disabled: isUserIsMainAdmin}, Validators.required),
        password: new FormControl(userObject.password, Validators.required),
        isAdmin: new FormControl({value: userObject.isAdmin, disabled: isUserIsMainAdmin})
      });


    } else {
      userForm = new FormGroup({
        userName: new FormControl(null, Validators.required),
        password: new FormControl(null, Validators.required),
        isAdmin: new FormControl(false)
      });
    }

    // disabling edtion of the CLARK (master) user
    if (userObject && userObject.userName.toUpperCase() == 'ADMIN') {
      console.log('admin');
      this.userForm = new FormGroup({});
      userForm.controls['userName'].disable();
      userForm.controls['isAdmin'].disable();
    } else {
      userForm.controls['userName'].enable();
      userForm.controls['isAdmin'].enable();
    }

    return userForm;
  }

  editUser(_id: number) {
    // const userObject = this.userForm.getRawValue();

    // this.formSubmitting = true;

    // if (userObject.userName.toUpperCase() == 'ADMIN') {
    //   userObject.userName = 'ADMIN';
    //   userObject.isAdmin = true;
    // }

    console.log(this.userForm.value);

    this.subscription = this.usersApiService.editUser(this.userForm.value, _id)
      .subscribe(
        (_editedUser) => {
          // console.log('editUser', _returnedData);
          this.toastrService.clear();
          this.toastrService.success('', 'User edited!', { timeOut: 3000, progressBar: true, positionClass: 'toast-top-center' });

          this.usersArray = this.usersArray.filter(_user => _user.id != _id);
          this.usersArray.unshift(_editedUser);

          this.hideLoader();
          // this.resetModal(true);
        },
        (err) => {
          if (err.error && err.error.name == 'SequelizeUniqueConstraintError') {
            this.toastrService.clear();
            this.toastrService.error('', 'Duplicate username found! Use another one.', { timeOut: 3000, progressBar: true, positionClass: 'toast-top-center' });

            // this.messageService.add({key: 'top-center', sticky: true, severity: 'error', summary: 'Duplicate username found! Use another one.', closable: false});
          } else {
            this.toastrService.clear();
          this.toastrService.error('', 'Error! Please try again.', { timeOut: 3000, progressBar: true, positionClass: 'toast-top-center' });

            // this.messageService.add({key: 'top-center', sticky: true, severity: 'error', summary: 'Error! Please try again.', closable: false});
          }
          this.hideLoader();

          // this.resetModal(true);
        }
      );

  }

  deleteUser(_id, _modal) {
    this.modalService.open(_modal, { ariaLabelledBy: 'modal-basic-title', centered: true })
      .result.then((result) => {
        this.deleteUserFromDatabase(_id);
      },
      (reason) => {
      });
  }

  deleteUserFromDatabase(_userId) {

    this.loading = true;

    console.log(_userId);
    // getting the focused user
    let focusedUser, userIndex;
    userIndex = this.usersArray.findIndex((user: any) => user.id == _userId );
    focusedUser = this.usersArray[userIndex];

    // console.log(userIndex, focusedUser);

    // if clark is selected to delete, we will return this without deleting the user
    if (focusedUser.userName.toUpperCase() == 'ADMIN') {
      this.toastrService.clear();
      this.toastrService.warning('', 'ADMIN (master account) user cannot be deleted!', { timeOut: 5000, progressBar: true, positionClass: 'toast-top-center' });

      // this.messageService.add({key: 'top-center' , severity: 'warn', summary: 'CLARK (master account) user cannot be deleted!', closable: false});

      this.hideLoader();
      return;
    }

    this.subscription = this.usersApiService.deleteUser(_userId)
      .subscribe(
        (data) => {
          this.toastrService.clear();
          this.toastrService.success('', 'User deleted!', { timeOut: 3000, progressBar: true, positionClass: 'toast-top-center' });

          this.usersArray = this.usersArray.filter(_user => _user.id != _userId);
          this.hideLoader();
        },
        (err) => {
          this.toastrService.clear();
          this.toastrService.error('', 'Error! Please try again.', { timeOut: 3000, progressBar: true, positionClass: 'toast-top-center' });

          this.hideLoader();
        }
      )
    ;
  }

  private hideLoader() {

    this.filteredUsersArray = [];

    setTimeout(() => {
      this.filteredUsersArray = this.usersArray;
    }, 1);

    setTimeout(() => {
      this.loading = false;
    }, 500);
  }

  // deleteUser() {

  //   // getting the focused user
  //   let focusedUser, userIndex;
  //   userIndex = this.usersArray.findIndex((user: any) => user.id == this.focusedUserId );
  //   focusedUser = this.usersArray[userIndex];

  //   // console.log(userIndex, focusedUser);

  //   // if clark is selected to delete, we will return this without deleting the user
  //   if (focusedUser.userName.toUpperCase() == 'CLARK') {
  //     this.toastrService.clear();
  //     this.toastrService.warning('', 'CLARK (master account) user cannot be deleted!', { timeOut: 3000, progressBar: true, positionClass: 'toast-top-center' });

  //     // this.messageService.add({key: 'top-center' , severity: 'warn', summary: 'CLARK (master account) user cannot be deleted!', closable: false});

  //     return;
  //   }

  //   this.subscription = this.usersApiService.deleteUser(this.focusedUserId)
  //     .subscribe(
  //       (data) => {
  //         this.toastrService.clear();
  //     this.toastrService.success('', 'User deleted!', { timeOut: 3000, progressBar: true, positionClass: 'toast-top-center' });

  //         // this.messageService.add({key: 'top-center', life: 2000, severity: 'success', summary: 'User deleted!', closable: false});

  //         this.removeUserFromArray();
  //         this.focusedUserId = '0';
  //       },
  //       (err) => {
  //         this.toastrService.clear();
  //     this.toastrService.error('', 'Error! Please try again.', { timeOut: 3000, progressBar: true, positionClass: 'toast-top-center' });

  //         // this.messageService.add({key: 'top-center', sticky: true, severity: 'error', summary: 'Error! Please try again.'});

  //         // console.log(err);
  //       }
  //     )
  //   ;
  // }


  // resetModal(_isEdit) {
  //   if (!_isEdit) {
  //     this.userForm.reset();
  //     this.isPasswordInputShowPassword = false;
  //   }

  //   this.formSubmitting = false;
  // }

  // changeFocusedUser(_userId) {
  //   this.focusedUserId = _userId;
  // }

  changeFormValues() {
    // console.log(this.usersArray[this.usersArray.findIndex(user => user.id == this.focusedUserId)]);
    const user =  this.usersArray[this.usersArray.findIndex(_user => _user.id == this.focusedUserId)];
    this.userForm.setValue({
      userName: user.userName,
      password: user.password,
      isAdmin: user.isAdmin
    });

    // disabling edtion of the CLARK (master) user
    if (user.userName.toUpperCase() == 'ADMIN') {
      this.userForm.controls['userName'].disable();
      this.userForm.controls['isAdmin'].disable();
    } else {
      this.userForm.controls['userName'].enable();
      this.userForm.controls['isAdmin'].enable();
    }
    // this.userForm.value['userName']  = user.userName;
    // this.userForm.value['password']  = user.password;
    // this.userForm.value['isAdmin']  = user.isAdmin;
  }

  // addAvatarColors(_array): any {
  //   _array.forEach(e => {
  //     e.avatarColor = this.getRandomColor();
  //   });
  //   return _array;
  // }

  // getRandomColor() {
  //   return _.sample(['green', 'BROWN', 'PURPLE', 'RED', 'INDIGO', 'BLUE', 'TEAL', 'BLUE-GREY', 'GREY']).toLowerCase();
  // }


}
