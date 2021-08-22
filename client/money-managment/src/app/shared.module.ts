import { NgModule } from '@angular/core';

import { UserCurrencyPipe } from './user-currency.pipe';

@NgModule({
  declarations: [
    UserCurrencyPipe,
  ],
  imports: [
  ],
  exports: [
    UserCurrencyPipe
  ]
})
export class SharedModule { }
