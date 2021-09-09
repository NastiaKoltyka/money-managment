import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import * as moment from 'moment';
import { AuthService } from '../auth.sevice';
import { Category } from '../classes/category';

import { History } from '../classes/history';
import { HttpService } from '../http.sevice';


@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HistoryComponent implements OnInit {
  year:number;
  dataSource:any;
  displayedColumns: string[] = ['amount', 'description', 'date'];
  savings: Category[];
  expenses: Category[];
  months:string[];
  selectedMonth:number;
  monthNow:string;

  constructor(private httpService: HttpService, public authService: AuthService) {
    this.year=new Date().getFullYear();
    this.savings=[];
    this.expenses=[];
    this.months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec" ];
    this.selectedMonth=new Date().getMonth() + 1;
    this.monthNow=moment().subtract(1, 'months').format('M');
  }

  ngOnInit(): void {
    this.refreshData()
  }
  changeYear(number:number){
    this.year=this.year+number;
    this.refreshData();
  }
  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    this.selectedMonth=tabChangeEvent.index+1;
    this.refreshData()
  }

  refreshData(): void {
    this.httpService.getHistory(this.authService.user.id, this.selectedMonth, this.year).subscribe((data: History) => {
      this.dataSource=data;
    })
  }
}
