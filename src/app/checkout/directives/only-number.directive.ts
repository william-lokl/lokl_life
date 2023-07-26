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

    // Eliminamos cualquier carácter que no sea un número utilizando una expresión regular
    const numericValue = inputValue.replace(/[^0-9]/g, '');

    // Actualizamos el valor del input con solo números
    input.value = numericValue;
  }
}
