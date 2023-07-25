import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PaymentCard } from '../../interfaces/paymentCard.interface';
import { CustomSelectElement } from '../../interfaces/customSelectElement.interface';



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
  public cuotaActual: number = 3;
  public opcionesSelect: CustomSelectElement[] = [
    {name: "3 meses", value: 3, selected: true},
    {name: "6 meses", value: 6, selected: false},
    {name: "9 meses", value: 9, selected: false},
  ]
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
      this.paymentCards[0].selected = true
      this.paymentCards[1].selected = false
    }

    if(card == "pse"){
      this.paymentCards[1].selected = true
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

  changeDues(event: number){
    console.log(event);
  }
}
