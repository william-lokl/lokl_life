import { Component, Input, OnInit, SimpleChanges, OnChanges } from '@angular/core';

@Component({
  selector: 'app-card-payment',
  templateUrl: './card-payment.component.html',
  styleUrls: ['./card-payment.component.scss']
})
export class CardPaymentComponent implements OnInit, OnChanges {

  @Input() payment: string = "";
  @Input() selected?: boolean = true;
  @Input() resolucion_movil: boolean = false;

  description: string = "";
  title: string = "";

  imgUrl: string = ""

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selected']) {
      this.selected = changes['selected'].currentValue;
    }
    this.imgUrl = '/assets/icon/payment/' + this.payment + (!this.selected ? "-unselected" : "") + '.svg'

  }

  ngOnInit(): void {
    this.description = this.payment == 'visa' ? "VISA, Mastercard, American":"Bancolombia, Davivienda..."
    this.title = this.payment == 'visa' ? "Tarjeta de crédito":"Cuenta de ahorros o corriente"
  }

}
