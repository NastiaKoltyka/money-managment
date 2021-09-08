import { Observable } from 'rxjs';

import { User } from '../classes/user';
import { History } from '../classes/history';
import { Statistic } from '../classes/statistic';

export class HttpServiceMock {

  constructor() { }

  getUser(userId: number): Observable<User> {
    return new Observable<User>((observer) => { observer.next(new User('test', 'test@gmail.com', 'test')) });
  }

  transferFromSavingToExpenses(savingId: number,expenseId:number, amount:number ): Observable<void> {
    return new Observable<void>((observer) => { observer.next() });
  }
  
  transferFromIncomeToSaving(userId: number,savingId:number, amount:number ): Observable<void> {
    return new Observable<void>((observer) => { observer.next() });
  }
  getHistory(userId: number ): Observable<History> {
    return new Observable<History>((observer) => { observer.next(new History()) });
  }
  getSavingStatistic(userId: number ): Observable<Statistic> {
    return new Observable<Statistic>((observer) => { observer.next(new Statistic()) });
  }
  getExpenseStatistic(userId: number ): Observable<Statistic> {
    return new Observable<Statistic>((observer) => { observer.next(new Statistic()) });
  }
  updateUser(userId: number, user: User ): Observable<void> {
    return new Observable<void>((observer) => { observer.next() });
  }
}


