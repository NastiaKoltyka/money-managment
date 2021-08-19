import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  calculatorVisible:boolean;
  result:number;

  constructor( public activatedRout:ActivatedRoute) {
    this.savings = [];
    this.expenses =[];
    this.selectedIncome = false;
    this.selectedSaving = -1;
    this.selectedSpend = -1;
    this.calculatorVisible=false;
    this.result=0;
  }

  ngOnInit(): void {
    this.activatedRout.data.subscribe(data=>{
      this.savings = data.user.savings;
      this.expenses = data.user.expenses;
    })
  }

  selectSpend(index: number) {
    if (this.selectedSaving != -1) {
      this.selectedSpend = -1;
      this.selectedSaving = -1;
      this.calculatorVisible=true;
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
      this.calculatorVisible=true;
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
  applyTransaction(result:number) {
    this.result=result;
  }
  closeCalculator() {
    this.calculatorVisible = false;
  }
}
