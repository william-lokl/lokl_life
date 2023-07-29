import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
  inputActivated: boolean = false;
  @Output() onInput: EventEmitter<string | number> = new EventEmitter<string | number>()
  @Input() control: FormControl = new FormControl();
  @Input() type: string = 'text';
  @Input() onlyNumber: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  inputFocus() {
    this.inputActivated = true;
  }

  inputBlur() {
    this.inputActivated = false;
  }

  $onInput(event: any){
    this.onInput.emit(event.target.value)
  }
}
