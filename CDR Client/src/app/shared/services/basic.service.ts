import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BasicService {
  private titleSubject = new Subject<any>();
  title$ = this.titleSubject.asObservable();

  private path = 'http://cdr.isols.tech';

  constructor() { }

  // changeTitle(_title): void {
  //   // console.log('=====>>>> from base service changeTitle()');
  //   if (_title) {
  //     this.titleSubject.next(_title);
  //   }
  // }
  getPath() {
    if (environment.production) {
      return this.path;
    }
    return 'http://localhost:3000';
  }
}
