import { Component, Input, OnInit, SimpleChanges, OnChanges } from '@angular/core';

@Component({
  selector: 'app-card-payment',
  templateUrl: './card-payment.component.html',
  styleUrls: ['./card-payment.component.scss']
})
export class CardPaymentComponent implements OnInit, OnChanges {

  @Input() payment: string = "";
  @Input() selected?: boolean = true;

  imgUrl: string = ""

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selected']) {
      this.selected = changes['selected'].currentValue;
    }
    this.imgUrl = '/assets/icon/payment/' + this.payment + (!this.selected ? "-unselected" : "") + '.svg'
  }

  ngOnInit(): void {

  }

}
