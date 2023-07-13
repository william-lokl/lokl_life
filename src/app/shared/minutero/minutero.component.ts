import { Component, OnDestroy, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-minutero',
  templateUrl: './minutero.component.html',
  styleUrls: ['./minutero.component.scss'],
})
export class MinuteroComponent implements OnInit, OnDestroy {
  fecha_actual: any;
  private timerSubscription!: Subscription;
  constructor() {}

  ngOnInit(): void {
    this.startTimer();
  }

  ngOnDestroy() {
    this.stopTimer();
  }

  private stopTimer() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }
  private startTimer() {
    this.timerSubscription = interval(1000).subscribe(() => {
      this.fecha_actual = moment().format('MMMM Do YYYY, h:mm:ss a');
    });
  }
}
