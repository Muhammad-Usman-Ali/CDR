import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BasicService {
  private titleSubject = new Subject<any>();
  title$ = this.titleSubject.asObservable();

  // private path = 'http://cdr.isols.tech';

  constructor() { }

  // changeTitle(_title): void {
  //   // console.log('=====>>>> from base service changeTitle()');
  //   if (_title) {
  //     this.titleSubject.next(_title);
  //   }
  // }
  
  // gets whether a http or https protocol used
  private websiteProtol = window.location.href.split(':')[0];
  private path = this.websiteProtol + '://cdr.isols.tech';
  // private path = 'http://graph.themeparkview.com:3000';

  getPath() {
    // console.log('production is on ==> ' + environment.production );
    // if (environment.production) {
    //   return this.path;
    // }
    // return 'http://localhost:3000';

      // console.log(window.location);
      const hostName = window.location.hostname;

      // console.log(window.location);
      if (hostName != 'localhost') {
        return this.path;
      }

      // console.log('http://localhost:3000');

      return 'http://localhost:3000';
    }
  // getPath() {
  //   if (environment.production) {
  //     return this.path;
  //   }
  //   return 'http://localhost:3000';
  // }
}
