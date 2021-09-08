import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { MyProfileComponent } from './my-profile.component';
import { MaterialModule } from '../shared/material/material.module';
import { PasswordPopupComponent } from '../password-popup/password-popup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmPopupDialogComponent } from '../confirm-popup.dialog/confirm-popup.dialog.component';
import { PicturePikerComponent } from '../picture-piker/picture-piker.component';



const routes: Routes = [
  { path: '', component: MyProfileComponent }]


@NgModule({
  declarations: [MyProfileComponent, PasswordPopupComponent, ConfirmPopupDialogComponent,PicturePikerComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class MyProfileModule { }
