import { Component, OnInit, ViewEncapsulation } from '@angular/core';
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

  constructor(private httpService: HttpService, private authService: AuthService) {
    this.year=2021;
    this.data=new History();
    this.savings=[];
    this.expenses=[];
    this.months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec" ]
  }


  ngOnInit(): void {
    this.httpService.getHistory(this.authService.user.id).subscribe((data: History) => {
      this.data=data;
      this.dataSource = this.data;
    })

  }
  changeYear(number:number){
    this.year=this.year+number;
  }
  
}
