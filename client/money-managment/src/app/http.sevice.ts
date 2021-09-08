import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from './classes/user';
import { AuthService } from './auth.sevice';
import { History } from './classes/history';
import { Statistic } from './classes/statistic';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  host: string = 'http://127.0.0.1:3000/api';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getUser(userId: number): Observable<User> {
    return this.http.get<User>(`${this.host}/users/${userId}`, this.getAuthHeader());
  }

  transferFromSavingToExpenses(savingId: number,expenseId:number, amount:number ): Observable<void> {
    let body = {savingId, expenseId, amount};
    return this.http.post<void>(`${this.host}/transactions/saving-to-expense`, body, this.getAuthHeader());
  }
  
  transferFromIncomeToSaving(userId: number,savingId:number, amount:number ): Observable<void> {
    let body = {userId, savingId, amount};
    return this.http.post<void>(`${this.host}/transactions/income-to-saving`, body, this.getAuthHeader());
  }
  getHistory(userId: number, month:number, year:number ): Observable<History> {
    return this.http.get<History>(`${this.host}/transactions/history/${userId}/${month}/${year}`, this.getAuthHeader());
  }
  getSavingStatistic(userId: number, month:number, year:number  ): Observable<Statistic> {
    return this.http.get<Statistic>(`${this.host}/statistics/income-distribution/${userId}/${month}/${year}`, this.getAuthHeader());
  }
  getExpenseStatistic(userId: number, month:number, year:number  ): Observable<Statistic> {
    return this.http.get<Statistic>(`${this.host}/statistics/expense-distribution/${userId}/${month}/${year}`, this.getAuthHeader());
  }
  updateUser(userId: number, user: User ): Observable<void> {
    return this.http.post<void>(`${this.host}/users/${userId}`,user, this.getAuthHeader());
  }
  

  private getAuthHeader() {
    return { headers: { 'Authorization': `Bearer ${this.authService.token}` } } 
  }
}


