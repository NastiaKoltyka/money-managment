import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { MyProfileComponent } from './my-profile.component';
import { MaterialModule } from '../shared/material/material.module';
import { PasswordPopupComponent } from '../password-popup/password-popup.component';



const routes: Routes = [
  { path: '', component: MyProfileComponent }]


@NgModule({
  declarations: [MyProfileComponent, PasswordPopupComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    FormsModule
  ]
})
export class MyProfileModule { }
