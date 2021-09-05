import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CalculatorComponent } from './calculator.component';

describe('CalculatorComponent', () => {
  let component: CalculatorComponent;
  let fixture: ComponentFixture<CalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalculatorComponent ],
      imports: [ReactiveFormsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should press button', () => {
    fixture = TestBed.createComponent(CalculatorComponent);
    const app = fixture.componentInstance;
    app.calculator.controls['number'].setValue('');
    app.pressButton('3');
    expect(app.calculator.controls['number'].value).toEqual('3');
  });

  it('should press button', () => {
    fixture = TestBed.createComponent(CalculatorComponent);
    const app = fixture.componentInstance;
    app.calculator.controls['number'].setValue('');
    app.pressButton('3');
    expect(app.calculator.controls['number'].value).toEqual('3');
  });

  it('should evaluate expression', () => {
    fixture = TestBed.createComponent(CalculatorComponent);
    const app = fixture.componentInstance;
    app.calculator.controls['number'].setValue('2+2*2');
    app.equals();
    expect(app.calculator.controls['number'].value).toEqual(6);
  });

  it('should save changes', () => {
    fixture = TestBed.createComponent(CalculatorComponent);
    const app = fixture.componentInstance;
    app.calculator.controls['number'].setValue('15');
    spyOn(app.apply, 'emit');
    spyOn(app.closeCalculator, 'emit');
    app.save();
    expect(app.result == '15').toBeTrue();
    expect(app.invalid_fields).toEqual(false);
    expect(app.apply.emit).toHaveBeenCalledWith(15);
    expect(app.closeCalculator.emit).toHaveBeenCalled();
  });

  it('shouldn\'t save changes', () => {
    fixture = TestBed.createComponent(CalculatorComponent);
    const app = fixture.componentInstance;
    app.calculator.controls['number'].setValue('asd');
    app.save();
    expect(app.invalid_fields).toEqual(true);
  });

  it('should close', () => {
    fixture = TestBed.createComponent(CalculatorComponent);
    const app = fixture.componentInstance;
    spyOn(app.closeCalculator, 'emit');
    app.close();
    expect(app.closeCalculator.emit).toHaveBeenCalled();
  });

  it('should focus', () => {
    fixture = TestBed.createComponent(CalculatorComponent);
    const app = fixture.componentInstance;
    app.focused = false;
    app.onFocus();
    expect(app.focused).toEqual(true);
  });

  it('should blur', () => {
    fixture = TestBed.createComponent(CalculatorComponent);
    const app = fixture.componentInstance;
    app.focused = true;
    app.onBlur();
    expect(app.focused).toEqual(false);
  });
});
