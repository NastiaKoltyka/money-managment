import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
// import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
// import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
// import {MatDatepicker} from '@angular/material/datepicker';
// import * as _moment from 'moment';
// import {default as _rollupMoment, Moment} from 'moment';



import { HttpService } from '../http.sevice';
import { AuthService } from '../auth.sevice';
import { Statistic } from '../classes/statistic';
import { FormControl } from '@angular/forms';

// const moment = _rollupMoment || _moment;
// export const MY_FORMATS = {
//   parse: {
//     dateInput: 'MM/YYYY',
//   },
//   display: {
//     dateInput: 'MM/YYYY',
//     monthYearLabel: 'MMM YYYY',
//     dateA11yLabel: 'LL',
//     monthYearA11yLabel: 'MMMM YYYY',
//   },
// };
@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css'],
  // providers: [
  //   {
  //     provide: DateAdapter,
  //     useClass: MomentDateAdapter,
  //     deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
  //   },
  //   {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  // ],
})
export class StatisticComponent implements OnInit {
  savingStatistic:any;
  savingsPercents:number [];
  chart:Chart;
  // date = new FormControl(moment());

  constructor(private httpService: HttpService, private authService: AuthService) {
    this.savingStatistic=new Statistic();
    this.savingsPercents=[];
    this.chart= new Chart
  }

  ngOnInit(): void {
    this.httpService.getSavingStatistic(this.authService.user.id,9,2021).subscribe((data: any) => {
      this.savingStatistic=data;
      this.savingStatistic.forEach((element: any) => {
        this.savingsPercents.push(element.percent)
      });
      this.chart = new Chart({
        chart: {
          type:  'column',
        },
        title: {
          text: ''
        },
        credits: {
          enabled: false
        },
        series: [
          {
            name: 'Line 1',
            type: 'column',
            data: this.savingsPercents
          }
        ]
      });
      
    })
    this.httpService.getExpenseStatistic(this.authService.user.id,9,2021).subscribe((data: Statistic) => {
      // console.log('Expense statistic:', data)
    })   
  }
  // chosenYearHandler(normalizedYear: Moment) {
  //   const ctrlValue = this.date.value;
  //   ctrlValue.year(normalizedYear.year());
  //   this.date.setValue(ctrlValue);
  // }

  // chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
  //   const ctrlValue = this.date.value;
  //   ctrlValue.month(normalizedMonth.month());
  //   this.date.setValue(ctrlValue);
  //   datepicker.close();
  // }

}
