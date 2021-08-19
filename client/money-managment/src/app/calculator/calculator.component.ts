import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HostListener } from '@angular/core';


@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {
  @Output() apply = new EventEmitter()
  @Output() closeCalculator = new EventEmitter()
  buttons: string[]
  result: string;
  calculator: FormGroup;
  invalid_fields: boolean;
  key: string;
  focused: boolean;

  constructor() {
    this.buttons = ["7", "8", "9", "/", "4", "5", "6", "*", "1", "2", "3", "0", "+", "-", "."];
    this.result = '';
    this.invalid_fields = false;
    this.focused = false;
    this.key = '';
    this.calculator = new FormGroup({
      "number": new FormControl('', Validators.pattern(`^[0-9+\\-*\\/\\(\\)\\.]*$`)),
    })
  }

  ngOnInit(): void {
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.key = event.key;
    if (this.buttons.includes(this.key) && !this.focused) {
      this.calculator.controls['number'].setValue(this.calculator.controls['number'].value + this.key);
      this.focused = false;
    }
    this.key = ''

  }
  pressButton(button: string) {
    this.calculator.controls['number'].setValue(this.calculator.controls['number'].value + button);
  }
  equals() {
    this.result = eval(this.calculator.controls['number'].value);
    this.calculator.controls['number'].setValue(this.result);
  }
  save() {
    if (this.calculator.valid) {
      this.result = eval(this.calculator.controls['number'].value);
      this.invalid_fields = false;
      this.apply.emit(parseInt(this.result));
      this.closeCalculator.emit();
    }
    else {
      this.invalid_fields = true;
    }
  }
  close() {
    this.closeCalculator.emit();
  }
  onFocus() {
    this.focused = true;
  }
  onBlur() {
    this.focused = false;
  }
 

}
