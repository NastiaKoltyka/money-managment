import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';


import { HttpService } from '../http.sevice';
import { AuthService } from '../auth.sevice';
import { Statistic } from '../classes/statistic';



@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit {
  savingStatistic:any;
  percents:[number];
  chart:Chart;


  constructor(private httpService: HttpService, private authService: AuthService) {
    this.savingStatistic=new Statistic();
    this.percents=[0];
    this.chart= new Chart
  }

  ngOnInit(): void {
    this.httpService.getSavingStatistic(this.authService.user.id,9,2021).subscribe((data: any) => {
      // console.log('Saving statistic:', data)
      this.savingStatistic=data;
      this.savingStatistic.forEach((element: any) => {
        this.percents.push(element.percent)
        console.log(this.percents)
      });
      
    })
    console.log(this.percents.length)
    this.httpService.getExpenseStatistic(this.authService.user.id,9,2021).subscribe((data: Statistic) => {
      // console.log('Expense statistic:', data)
    })
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
          data: [1,2,3]
        }
      ]
    });
    
  }

  // add() {
  //   this.chart.addPoint(Math.floor(Math.random() * 10));
  // }

}
