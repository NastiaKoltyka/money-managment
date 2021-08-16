import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from './classes/user';
import { AuthService } from './auth.sevice';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  host: string = 'http://127.0.0.1:3000/api/';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getUser(userId: number): Observable<User> {
    return this.http.get<User>(`${this.host}/users/${userId}`, this.getAuthHeader());
  }

  private getAuthHeader() {
    return { headers: { 'Authorization': `Bearer ${this.authService.token}` } } 
  }
}


