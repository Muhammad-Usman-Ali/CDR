import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { User } from '../../interfaces';

@Injectable({
  providedIn: 'root'
})

export class UsersApiService {

  constructor(private apiService: ApiService) {}

    getUsersList() {
      return this.apiService.request('get', 'user/list');
    }
    createUser(_user: User) {
      return this.apiService.request('post', 'user/create', _user);
    }
    editUser(_user: User, _userId) {
      return this.apiService.request('post', `user/${_userId}/edit`, _user);
    }
    deleteUser(_userId: any) {
      return this.apiService.request('post', `user/${_userId}/delete`);
    }
}
