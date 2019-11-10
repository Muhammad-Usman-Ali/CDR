import { Injectable } from '@angular/core';
import { LocalStoreService } from './local-store.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { delay, map, catchError } from 'rxjs/operators';
import { User } from '../interfaces';
import { AuthApiService } from './api/auth-api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Only for demo purpose
  authenticated = true;

  constructor(
    private store: LocalStoreService,
    private router: Router,
    private authApi: AuthApiService
    ) {
    this.checkAuth();
  }

  checkAuth() {
    this.authenticated = !!this.store.getItem('login_status');
  }

  // getuser() {
  //   return of({});
  // }

  signin(_credentials) {
    // console.log(_credentials);
    return this.authApi.login(_credentials)
      .pipe(
        delay(1000),
        map((_data) => {
          if (_data.token) {
            this.store.setItem('login_status', true);
            this.store.setItem('jwt-token', _data.token);

            this.authenticated = true;
        }

        return _data;
        }
      ),
      catchError(
        err => {
          // console.error('===> Error from auth.service.ts: ', err);
          return throwError(err);
        }
      )
      );

    // this.authenticated = true;
    // this.store.setItem('login_status', true);
    // return of({}).pipe(delay(1500));
  }
  signout() {
    this.authenticated = false;
    this.store.setItem('login_status', false);
    this.store.removeItem('jwt-token');
    this.router.navigateByUrl('/sessions/signin');
  }

  getUserDetails(): User {
    const token = this.store.getItem('jwt-token');
    let payload;

    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);

      return JSON.parse(payload);
    } else {
      return null;
    }
  }

}
