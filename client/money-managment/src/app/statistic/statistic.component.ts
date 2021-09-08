import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import * as _moment from 'moment';
import { default as _rollupMoment, Moment } from 'moment';




import { HttpService } from '../http.sevice';
import { AuthService } from '../auth.sevice';
import { Statistic } from '../classes/statistic';
import { FormControl } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs';

const moment = _rollupMoment || _moment;
export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class StatisticComponent implements OnInit {
  savingStatistic: any;
  savingsPercents: number[];
  savingsCategories: string[];
  expensesPercents: number[];
  expensesCategories: string[];
  savingChart: Chart;
  expenseChart: Chart;
  date = new FormControl(moment());

  constructor(private httpService: HttpService, private authService: AuthService) {
    this.savingStatistic = new Statistic();
    this.savingsPercents = [];
    this.savingsCategories=[];
    this.expensesPercents = [];
    this.expensesCategories=[];
    this.savingChart= new Chart;
    this.expenseChart= new Chart;
  }

  ngOnInit(): void {
    this.showSavingStatistic(this.authService.user.id, this.date.value.month() + 1, this.date.value.year())
  }
  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.date.value;
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);

  }
  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
     if(tabChangeEvent.index==0){
      this.showSavingStatistic(this.authService.user.id, this.date.value.month() + 1, this.date.value.year())
     }
     else{
      this.showExpensesStatistic(this.authService.user.id, this.date.value.month() + 1, this.date.value.year())
     }
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value;
    ctrlValue.month(normalizedMonth.month());
    this.date.setValue(ctrlValue);
    datepicker.close();
    this.showSavingStatistic(this.authService.user.id, this.date.value.month() + 1, this.date.value.year())
    this.showExpensesStatistic(this.authService.user.id, this.date.value.month() + 1, this.date.value.year())
  }

  showSavingStatistic(id: number, month: number, year: number) {
    this.savingsPercents = [];
    this.savingsCategories=[];
    this.httpService.getSavingStatistic(id, month, year).subscribe((data: any) => {
      this.savingStatistic = data;
      this.savingStatistic.forEach((element: any) => {
        this.savingsPercents.push(element.percent)
        this.savingsCategories.push(element.category)
      });
      this.savingChart = new Chart({
        chart: {
          type: 'column',
        },
        title: {
          text: 'Savings'
        },
        credits: {
          enabled: false
        },
        xAxis: {
          categories: this.savingsCategories
        },
        series: [
          {
            name: 'Line 1',
            type: 'column',
            data: this.savingsPercents
          }
        ]
      })
    });
  }
  showExpensesStatistic(id: number, month: number, year: number) {
    this.expensesPercents = [];
    this.expensesCategories=[];
    this.httpService.getExpenseStatistic(id, month, year).subscribe((data: any) => {
      this.savingStatistic = data;
      console.log(data)
      this.savingStatistic.forEach((element: any) => {
        this.expensesPercents.push(element.percent)
        this.expensesCategories.push(element.category)
      });
      this.expenseChart = new Chart({
        chart: {
          type: 'column',
        },
        title: {
          text: 'Expenses'
        },
        credits: {
          enabled: false
        },
        xAxis: {
          categories: this.expensesCategories
        },
        series: [
          {
            name: 'Line 1',
            type: 'column',
            data: this.expensesPercents
          }
        ]
      })
    });
  }

}
