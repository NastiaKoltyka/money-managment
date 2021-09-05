import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';

import { UserCurrencyPipe } from './user-currency.pipe';

@NgModule({
  declarations: [
    UserCurrencyPipe,
  ],
  imports: [
    ToastrModule.forRoot(),
  ],
  exports: [
    UserCurrencyPipe
  ]
})
export class SharedModule { }
