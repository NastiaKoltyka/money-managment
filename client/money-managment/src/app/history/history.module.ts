import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { HistoryComponent } from './history.component';
import { MaterialModule } from '../shared/material/material.module';
import { SharedModule } from '../shared.module';
const routes: Routes = [
  { path: '', component: HistoryComponent}]


@NgModule({
  declarations: [HistoryComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    SharedModule
  ]
})
export class HistoryModule { 
  
}
