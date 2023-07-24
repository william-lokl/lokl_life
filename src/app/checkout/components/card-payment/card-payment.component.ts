import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-payment',
  templateUrl: './card-payment.component.html',
  styleUrls: ['./card-payment.component.scss']
})
export class CardPaymentComponent implements OnInit {

  @Input() payment: string = "";
  @Input() selected: boolean = false;

  imgUrl: string = ""

  constructor() { }

  ngOnInit(): void {
    this.imgUrl = '/assets/icon/payment/' + this.payment + (!this.selected ? "-unselected" : "") + '.svg'
    console.log(this.imgUrl);
    console.log(this.payment);
  }

}
