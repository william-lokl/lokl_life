import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-minutero',
  templateUrl: './minutero.component.html',
  styleUrls: ['./minutero.component.scss'],
})
export class MinuteroComponent implements OnInit {
  fecha_actual = moment().format('MMMM Do YYYY, h:mm:ss a');
  constructor() {}

  ngOnInit(): void {}
}
