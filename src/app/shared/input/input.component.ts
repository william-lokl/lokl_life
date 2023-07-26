import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
  inputActivated: boolean = false;
  @Input() control: FormControl = new FormControl();

  constructor() {}

  ngOnInit(): void {}

  inputFocus() {
    this.inputActivated = true;
  }

  inputBlur() {
    this.inputActivated = false;
  }
}
