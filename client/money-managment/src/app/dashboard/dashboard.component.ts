import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.sevice';
import { Category } from '../classes/category';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  savings: Category[];
  expenses: Category[];
  selectedSpend: number;
  selectedSaving: number;
  selectedIncome: boolean;

  constructor(public authService: AuthService) {
    this.savings = authService.user.savings;
    this.expenses = authService.user.expenses;
    this.selectedIncome = false;
    this.selectedSaving = -1;
    this.selectedSpend = -1;
  }

  ngOnInit(): void {
  }

  selectSpend(index: number) {
    if (this.selectedSaving != -1) {
      this.selectedSpend = -1;
      this.selectedSaving = -1;
      confirm('Spend money)))');
    }
    else {
      alert('First choose saving');
      this.selectedSpend = -1;
      this.selectedSaving = -1;
      this.selectedIncome = false;
    }
  }

  selectSaving(index: number) {
    if (this.selectedIncome) {
      this.selectedSaving = -1;
      this.selectedIncome = false;
      confirm('Income money)))');
    }
    else {
      if (this.selectedSaving !== index) {
        this.selectedSaving = index;
        this.selectedIncome = false;
        this.selectedSpend = -1;
      }
      else {
        this.selectedSaving = -1
      }
    }
  }

  selectIncome() {
    this.selectedIncome = !this.selectedIncome;
    this.selectedSaving = -1;
    this.selectedSpend = -1;
  }

}
