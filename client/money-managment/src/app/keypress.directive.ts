import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[keypress]',
  host:{
    '(focus)': 'setInputFocus()',
    '(blur)': 'setInputBlur()',
  }
})
export class KeypressDirective {

  focused: boolean;

  constructor(private elementRef: ElementRef) {
    this.focused = false; 
  }
 
  setInputFocus(): void {
    this.focused = true;
  }

  setInputBlur(): void {
    this.focused = false;
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    let key = event.key;
    if (!this.focused) {
      this.elementRef.nativeElement.value += key;
      this.focused = false;
    }
  }
  
}
