import { Component, OnInit } from '@angular/core';
import { SharedAnimations } from 'src/app/shared/animations/shared-animations';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { Router, RouteConfigLoadStart, ResolveStart, RouteConfigLoadEnd, ResolveEnd } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.scss'],
    animations: [SharedAnimations]
})
export class SigninComponent implements OnInit {
    loading: boolean;
    loadingText: string;
    signinForm: FormGroup;
    constructor(
        private fb: FormBuilder,
        private auth: AuthService,
        private router: Router,
        private toastrService: ToastrService
    ) { }

    ngOnInit() {

      // if uer is already logged in, we not show him sign in page
      if (this.auth.authenticated) {
        this.router.navigateByUrl('/dashboard/v1');
      }
        this.router.events.subscribe(event => {
            if (event instanceof RouteConfigLoadStart || event instanceof ResolveStart) {

                if (this.loading) {
                  this.loadingText = 'Loading Dashboard Module...';
                }
            }
            if (event instanceof RouteConfigLoadEnd || event instanceof ResolveEnd) {
                this.loading = false;
            }
        });

        this.signinForm = this.fb.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    signin() {
        this.loading = true;
        this.loadingText = 'Signing in...';

        // we are using userName for signing in on server not email
        this.signinForm.value.userName = this.signinForm.value.email;
        this.auth.signin(this.signinForm.value)
            .subscribe(
              res => {
                this.router.navigateByUrl('/dashboard/v1');
                // this.loading = false;
              },
              err => {
                this.toastrService.error('Invalid username or password!', 'Sign in failed!', { timeOut: 3000, progressBar: true, positionClass: 'toast-top-center' });

                this.loadingText = 'Sign in failed!';
                setTimeout(() => {
                  this.loading = false;
                }, 2000);
              }
            );
    }

}
