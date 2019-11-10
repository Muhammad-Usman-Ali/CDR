import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurd implements CanActivate {

  constructor(
    private router: Router,
    private auth: AuthService,
    // private route: ActivatedRoute
  ) { }

  canActivate(route: ActivatedRouteSnapshot ) {
    // debugger;
    // console.log(route.data);

    if (this.auth.authenticated) {
      if (route.data.forAdmin) { // if route is for admin

        // if user is admin
        if (this.auth.getUserDetails().isAdmin) {
          return true;
        } else {
          this.router.navigateByUrl('/');
          return false;
        }
      } else {
        return true;
      }

    } else {
      this.router.navigateByUrl('/sessions/signin');
    }
  }
}
