import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ChartModule } from 'angular-highcharts';


import { MaterialModule } from '../shared/material/material.module';
import { StatisticComponent } from './statistic.component';

const routes: Routes = [
  { path: '', component: StatisticComponent}]


@NgModule({
  declarations: [StatisticComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ChartModule,
    MaterialModule
  ]
})
export class StatisticModule { }
