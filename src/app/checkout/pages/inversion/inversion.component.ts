import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PaymentCard } from '../../interfaces/paymentCard.interface';



@Component({
  selector: 'app-inversion',
  templateUrl: './inversion.component.html',
  styleUrls: ['./inversion.component.scss']
})
export class InversionComponent implements OnInit {

  public checkboxControl: FormControl = new FormControl(false);
  public fecha: Date = new Date();
  public fechaEnMes: Date =  this.generarFecha();
  public pagoUnicoSelected: boolean = false;
  public selectCuotasSelected: boolean = false;
  total = 11200040;
  subtotal = 30000000;

  paymentCards: PaymentCard[] = [
    {name: 'visa', selected: false},
    {name: 'pse', selected: false},
  ]

  constructor() { }

  ngOnInit(): void {
  }

  generarFecha(): Date{
    const fecha = new Date();

    fecha.setMonth( fecha.getMonth() + 1 )

    return fecha;
  }

  clickAuth(){
    this.checkboxControl.setValue( !this.checkboxControl.value )
  }

  activateCard(card: "visa" | "pse"){

    if(card == "visa"){
      this.paymentCards[0].selected = !this.paymentCards[0].selected
      this.paymentCards[1].selected = false
    }

    if(card == "pse"){
      this.paymentCards[1].selected = !this.paymentCards[1].selected
      this.paymentCards[0].selected = false
    }

  }

  clickSelectCuotas(){
    this.selectCuotasSelected = true;
    this.pagoUnicoSelected = false;
  }

  clickPagoUnico(){
    this.selectCuotasSelected = false;
    this.pagoUnicoSelected = true;
  }

}
