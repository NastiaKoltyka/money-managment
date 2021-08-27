import { Component, OnInit } from '@angular/core';
import { History } from '../classes/history';
import { HttpService } from '../http.sevice';
import { AuthService } from '../auth.sevice';

import { Statistic } from '../classes/statistic';


@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit {

  constructor(private httpService: HttpService, private authService: AuthService) {
    this.httpService.getSavingStatistic(authService.user.id).subscribe((data: Statistic) => {
      console.log('Saving statistic:', data)
    })
    this.httpService.getExpenseStatistic(authService.user.id).subscribe((data: Statistic) => {
      console.log('Expense statistic:', data)
    })
  }
  ngOnInit(): void {
  }

}
