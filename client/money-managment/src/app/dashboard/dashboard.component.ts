import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.sevice';
import { Category } from '../classes/category';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
savings:Category[];
expenses:Category[];

  constructor( public authService: AuthService) {
    this.savings=authService.user.savings;
    this.expenses=authService.user.expenses
   }

  ngOnInit(): void {
  }

}
