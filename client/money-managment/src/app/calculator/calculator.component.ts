import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {
  buttons: string[]
  result: string;
  calculator: FormGroup;
  visible:boolean;
  invalid_fields: boolean;

  constructor() {
    this.buttons = ["7", "8", "9", "/", "4", "5", "6", "*", "1", "2", "3", "0", "+", "-", "."];
    this.result = '';
    this.visible=true;
    this.invalid_fields= false;
    this.calculator = new FormGroup({
      "number": new FormControl('',Validators.pattern(`^[0-9+\\-*\\/\\(\\)\\.]*$`)),
    })
  }

  ngOnInit(): void {
  }
  pressButton(button: string) {
    this.calculator.controls['number'].setValue(this.calculator.controls['number'].value + button)
  }
  equals() {
   this.result=eval(this.calculator.controls['number'].value)
   this.calculator.controls['number'].setValue(this.result)
  }
  save() {
    if (this.calculator.valid) {
      this.result=eval(this.calculator.controls['number'].value)
      this.invalid_fields = false;
      this.visible=false;
    }
    else {
      this.invalid_fields = true;
    }
  }
  close() {
    this.visible=false;
  }
}
