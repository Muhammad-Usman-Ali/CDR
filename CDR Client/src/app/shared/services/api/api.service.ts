import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, delay } from 'rxjs/operators';
import { Router } from '@angular/router';
// import { MessageService } from 'primeng/api';
import { BasicService } from '../basic.service';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';
import { LocalStoreService } from '../local-store.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor (
    private http: HttpClient,
    private store: LocalStoreService
    ) {}
  // constructor(private messageService: MessageService, private auth: AuthService, private basicService: BasicService, private http: HttpClient) {}

  private path = 'http://cdr.isols.tech';

  public request(
    method: 'post' | 'get' | 'put' | 'delete',
    type: string,
    _objectToSend?: any,
    _httpParams?: HttpParams): Observable<any> {

      let base;
      const path = this.getPath();

      const options: any = { headers: { Authorization: 'Bearer ' + this.getJwtToken() }};
      if (method === 'post') {
        base = this.http.post(path + '/api/' + type, _objectToSend, options);
      } else if (method === 'get') {
        if (_httpParams) { options.params = _httpParams; }
        base = this.http.get(path + '/api/' + type, options);
      } else if (method === 'delete') {
        base = this.http.delete(path + '/api/' + type, options);
      } else if (method === 'put') {
        base = this.http.put(path + '/api/' + type, _objectToSend, options);
      }


      // console.log(path);
      const request = base.pipe(
        map((data) => {
          console.log(data);

          // if (data.token) {
          //   // console.log('===> from authentication.service.ts. In map of request(). Toke: ' + data.token);
          //   this.saveToken(data.token);
          // }

          return data;
        }),
        catchError(
          err => {
            // this.messageService.clear();
            // this.messageService.add({key: 'top-center', severity: 'error', sticky: true, summary: 'Error! Please refresh page and try again.', closable: true });

            console.error('===> Error ', err);
            return throwError(err);
          }
        )
      );

      return request;
    }

  private getPath() {
    if (environment.production) {
      return this.path;
    }
    return 'http://localhost:3000';
  }

  private getJwtToken() {
    return this.store.getItem('jwt-token');
  }
}
