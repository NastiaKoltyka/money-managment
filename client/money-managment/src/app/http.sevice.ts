import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from './classes/user';
import { AuthService } from './auth.sevice';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  host: string = 'http://127.0.0.1:3000/api';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getUser(userId: number): Observable<User> {
    return this.http.get<User>(`${this.host}/users/${userId}`, this.authService.getOptions());
  }

  transferFromSavingToExpenses(savingId: number,expenseId:number, amount:number ): Observable<void> {
    let body = {savingId, expenseId, amount};
    return this.http.post<void>(`${this.host}/transactions/saving-to-expense`, body, this.authService.getOptions());
  }
  
  transferFromIncomeToSaving(userId: number,savingId:number, amount:number ): Observable<void> {
    let body = {userId, savingId, amount};
    return this.http.post<void>(`${this.host}/transactions/income-to-saving`, body, this.authService.getOptions());
  }
}


