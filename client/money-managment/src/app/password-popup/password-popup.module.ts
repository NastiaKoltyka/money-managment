import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordPopupComponent } from './password-popup.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../shared/material/material.module';



const routes: Routes = [
  { path: '', component:PasswordPopupComponent}]


@NgModule({
  declarations: [PasswordPopupComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule
  ]
})

export class PasswordPopupModule { }
