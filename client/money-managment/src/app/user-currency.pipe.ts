import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'usercurrency'
})
export class UserCurrencyPipe implements PipeTransform {

  transform(value: number, currency: string): string {
    let result: string = `${value} ${currency}`;
    switch (currency) {
      case 'UAH':
        result = `${value} ₴`;
        break;
      case 'EUR':
        result = `${value} €`;
        break;
      case 'USD':
        result = `${value} $`;
        break;
    }

    return result;
  }
}
