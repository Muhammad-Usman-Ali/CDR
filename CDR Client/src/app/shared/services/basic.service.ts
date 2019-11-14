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


  getPath() {
    if (environment.production) {
      return window.location.origin;
    }
    return 'http://localhost:3000';
  }
}
