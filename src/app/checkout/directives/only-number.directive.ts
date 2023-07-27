import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[onlyNumber]'
})
export class OnlyNumberDirective {

  constructor() { }

  @HostListener('input', ['$event'])
  onInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const inputValue = input.value;

    const numericValue = inputValue.replace(/[^0-9]/g, '');

    input.value = numericValue;
  }
}
