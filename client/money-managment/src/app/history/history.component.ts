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
  data:History;
  dataSource:any;
  displayedColumns: string[] = ['amount', 'description', 'date'];
  savings: Category[];
  expenses: Category[];
  months:string[];
  selectedMonthIndex:number;
  monthNow:string;

  constructor(private httpService: HttpService, private authService: AuthService) {
    this.year=2021;
    this.data=new History();
    this.savings=[];
    this.expenses=[];
    this.months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec" ];
    this.selectedMonthIndex=0;
    this.monthNow=moment().subtract(1, 'months').format('M');
  }


  ngOnInit(): void {
    this.httpService.getHistory(this.authService.user.id, 8, 2021).subscribe((data: History) => {
      this.data=data;
      console.log(this.data)
      this.dataSource = this.data;
    })
  }
  changeYear(number:number){
    this.year=this.year+number;
  }
  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    this.selectedMonthIndex=tabChangeEvent.index;
    
    
  }

}
