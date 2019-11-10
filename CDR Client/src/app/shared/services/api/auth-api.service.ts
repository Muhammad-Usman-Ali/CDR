import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../interfaces';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  constructor(private apiService: ApiService) { }

  public login(user: User): Observable<any> {
    return this.apiService.request('post', 'login', user);
  }
}
