import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.sevice';

import { Category } from '../classes/category';
import { User } from '../classes/user';
import { HttpService } from '../http.sevice';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userId: number;
  userCurrency: string;
  userIncome: number;
  savings: Category[];
  expenses: Category[];
  selectedSpend: number;
  selectedSaving: number;
  selectedIncome: boolean;
  calculatorVisible: boolean;

  constructor(public activatedRout: ActivatedRoute, public httpService: HttpService, public authService: AuthService) {
    this.userId = 0;
    this.userIncome = 0
    this.userCurrency = '';
    this.savings = [];
    this.expenses = [];
    this.selectedIncome = false;
    this.selectedSaving = -1;
    this.selectedSpend = -1;
    this.calculatorVisible = false;

    this.authService.userRefresh.subscribe((data: User) => {
      this.userIncome = data.income;
      this.savings = data.savings;
      this.expenses = data.expenses;
    });
  }

  ngOnInit(): void {
    this.activatedRout.data.subscribe(data => {
      this.userIncome = data.user.income;
      this.userId = data.user.id;
      this.userCurrency = data.user.currency;
      this.savings = data.user.savings;
      this.expenses = data.user.expenses;
    })
  }

  selectSpend(index: number) {
    if (this.selectedSaving != -1) {
      this.calculatorVisible = true;
      this.selectedSpend = index;

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
      this.calculatorVisible = true;
      this.selectedSaving = index;
    }
    else {
      if (this.selectedSaving !== index) {
        this.selectedSaving = index;
        this.selectedIncome = false;
        this.selectedSpend = -1;
      }
      else {
        this.selectedSaving = -1;
      }
    }
  }

  selectIncome() {
    this.selectedIncome = !this.selectedIncome;
    this.selectedSaving = -1;
    this.selectedSpend = -1;
  }
  applyTransaction(result: number) {
    if (this.selectedIncome && this.selectedSaving != -1) {
      this.httpService.transferFromIncomeToSaving(this.userId, this.savings[this.selectedSaving].id, result).subscribe(() => {
        this.refreshUser();
        this.selectedSpend = -1;
        this.selectedSaving = -1;
        this.selectedIncome = false;
      });
    }
    else if (this.selectedSaving != -1, this.selectedSpend != -1) {
      this.httpService.transferFromSavingToExpenses(this.savings[this.selectedSaving].id, this.expenses[this.selectedSpend].id, result).subscribe(() => {
        this.refreshUser();
        this.selectedSpend = -1;
        this.selectedSaving = -1;
        this.selectedIncome = false;
      });
    }
  }
  closeCalculator() {
    this.calculatorVisible = false;
    this.selectedSpend = -1;
    this.selectedSaving = -1;
    this.selectedIncome = false;
  }
  refreshUser() {
    this.authService.refreshUser();
  }
}
