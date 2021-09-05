import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';

import { UserCurrencyPipe } from './user-currency.pipe';
import { UserHistoryPipe } from './user-history.pipe';

@NgModule({
  declarations: [
    UserCurrencyPipe,
    UserHistoryPipe,
  ],
  imports: [
    ToastrModule.forRoot(),
  ],
  exports: [
    UserCurrencyPipe,
    UserHistoryPipe
  ]
})
export class SharedModule { }
