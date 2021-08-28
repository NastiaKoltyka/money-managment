import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordPopupComponent } from './password-popup.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../shared/material/material.module';
import { FormsModule } from '@angular/forms';


const routes: Routes = [
  { path: '', component:PasswordPopupComponent}]


@NgModule({
  declarations: [PasswordPopupComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    FormsModule
  ],
})

export class PasswordPopupModule { }
