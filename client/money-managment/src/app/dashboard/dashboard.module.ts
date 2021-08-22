import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DashboardComponent } from '../dashboard/dashboard.component';
import { CalculatorComponent } from '../calculator/calculator.component';
import { KeypressDirective } from '../keypress.directive';



const routes: Routes = [
  { path: '', component: DashboardComponent }]

@NgModule({
  declarations: [
    DashboardComponent,
    CalculatorComponent,
    KeypressDirective,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ]
})
export class DashboardModule { }
