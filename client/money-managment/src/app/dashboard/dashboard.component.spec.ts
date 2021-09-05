import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs';
import { Category } from '../classes/category';
import { MaterialModule } from '../shared/material/material.module';
import { UserCurrencyPipe } from '../user-currency.pipe';

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent, UserCurrencyPipe],
      imports: [HttpClientModule, RouterTestingModule, MaterialModule],
      providers: []
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should select spend', () => {
    fixture = TestBed.createComponent(DashboardComponent);
    const app = fixture.componentInstance;
    let index = 5;
    app.selectedSaving = 1;
    app.selectSpend(index);
    expect(app.selectedSaving != -1 && app.calculatorVisible && app.selectedSpend == index).toBeTrue();
  });
  it('shouldn\'t select spend', () => {
    fixture = TestBed.createComponent(DashboardComponent);
    const app = fixture.componentInstance;
    let index = 5;
    app.selectedSaving = -1;
    app.selectSpend(index);
    expect(app.selectedSaving == -1 && !app.selectedIncome && app.selectedSpend == -1).toBeTrue();
  });
  it('should select saving and select income', () => {
    fixture = TestBed.createComponent(DashboardComponent);
    const app = fixture.componentInstance;
    let index = 5;
    app.selectedIncome = true;
    app.selectSaving(index);
    expect(app.selectedSaving == index && app.calculatorVisible && app.selectedIncome).toBeTrue();
  });
  it('should select saving and shouldn\'t select income', () => {
    fixture = TestBed.createComponent(DashboardComponent);
    const app = fixture.componentInstance;
    let index = 5;
    app.selectedIncome = false;
    app.selectSaving(index);
    expect(app.selectedSaving == index && !app.selectedIncome && app.selectedSpend == -1).toBeTrue();
  });

  it('shouldn\'nt select saving', () => {
    fixture = TestBed.createComponent(DashboardComponent);
    const app = fixture.componentInstance;
    let index = 5;
    app.selectedIncome = false;
    app.selectedSaving = index;
    app.selectSaving(index);
    expect(app.selectedSaving == -1).toBeTrue();
  });

  it('should select income', () => {
    fixture = TestBed.createComponent(DashboardComponent);
    const app = fixture.componentInstance;
    app.selectedIncome = false;
    app.selectIncome();
    expect(app.selectedIncome && app.selectedSaving == -1 && app.selectedSpend == -1).toBeTrue();
  });

  it('should apply transaction from income to saving', () => {
    fixture = TestBed.createComponent(DashboardComponent);
    const app = fixture.componentInstance;
    app.selectedIncome = true;
    app.selectedSaving = 0;
    app.userId = 4;
    app.savings = [new Category('saving1', 'saving1.png')];
    spyOn(app.httpService, 'transferFromIncomeToSaving').and.returnValue(new Observable<void>((observer) => { observer.next() }))
    app.applyTransaction(7);
    expect(app.httpService.transferFromIncomeToSaving).toHaveBeenCalledWith(4, 0, 7);
    expect(!app.selectedIncome && app.selectedSaving == -1 && app.selectedSpend == -1).toBeTrue();
  });

  it('should apply transaction from saving to expense', () => {
    fixture = TestBed.createComponent(DashboardComponent);
    const app = fixture.componentInstance;
    app.selectedSaving = 0;
    app.selectedSpend = 0;
    app.userId = 4;
    app.savings = [new Category('saving1', 'saving1.png')];
    app.expenses = [new Category('expense1', 'expense1.png')];
    spyOn(app.httpService, 'transferFromSavingToExpenses').and.returnValue(new Observable<void>((observer) => { observer.next() }))
    app.applyTransaction(7);
    expect(app.httpService.transferFromSavingToExpenses).toHaveBeenCalledWith(0, 0, 7);
    expect(!app.selectedIncome && app.selectedSaving == -1 && app.selectedSpend == -1).toBeTrue();
  });

  it('should close calculator', () => {
    fixture = TestBed.createComponent(DashboardComponent);
    const app = fixture.componentInstance;
    app.selectedSaving = 1;
    app.selectedSpend = 2;
    app.selectedIncome = true;
    app.calculatorVisible = true;
    app.closeCalculator();
    expect(!app.selectedIncome && app.selectedSaving == -1 && app.selectedSpend == -1 && !app.calculatorVisible).toBeTrue();
  });

  it('should refresh user', () => {
    fixture = TestBed.createComponent(DashboardComponent);
    const app = fixture.componentInstance;
    app.userId = 1;
    spyOn(app.authService, 'refreshUser');
    app.refreshUser();
    expect(app.authService.refreshUser).toHaveBeenCalled();
  });
});
