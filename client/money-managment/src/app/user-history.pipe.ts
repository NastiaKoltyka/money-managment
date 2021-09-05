import { Pipe, PipeTransform } from '@angular/core';
import { AuthService } from './auth.sevice';
@Pipe({
  name: 'userHistory'
})
export class UserHistoryPipe implements PipeTransform {

  constructor(private authService:AuthService){
  }

  transform(expenseId:number, savingId:number): string {
    let result:string;
    let savingName = this.authService.user.savings.find(s => s.id == savingId)?.category;
    let expenseName = this.authService.user.expenses.find(s => s.id == expenseId)?.category;
    if(expenseId!=null && savingId!=null ){
      result=`Expense (from ${savingName} to ${expenseName})`
    }
    else if(expenseId==null && savingId!=null){
      result=`Saving (from income to ${savingName})`
    }
    else{
      result='Unknown description'
    }
    return result;
  }

}

