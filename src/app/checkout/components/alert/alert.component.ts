import { Component, Input, OnInit } from '@angular/core';
import { delay, SchedulerLike } from 'rxjs';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  @Input() text: string = "";
  @Input() bgOrange: boolean = false;

  constructor() { }


  ngOnInit(): void {
  }

}
