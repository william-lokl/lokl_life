import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PaymentCard } from '../../interfaces/paymentCard.interface';
import { CustomSelectElement } from '../../interfaces/customSelectElement.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inversion',
  templateUrl: './inversion.component.html',
  styleUrls: ['./inversion.component.scss'],
})
export class InversionComponent implements OnInit{
  public fecha: Date = new Date();
  public fechaEnMes: Date = this.generarFecha();
  public pagoUnicoSelected: boolean = false;
  public selectCuotasSelected: boolean = false;
  public unitValue: number = 112000
  public opcionesSelect: CustomSelectElement[] = [
    { name: '3 meses', value: 3, selected: true },
    { name: '6 meses', value: 6, selected: false },
    { name: '9 meses', value: 9, selected: false },
  ];
  public formInversion: FormGroup = this.fb.group({
    value: [110000140, [Validators.min(11000000)]],
    dues: [1],
    payment: [''],
    acceptTerms: [false]
  })


  public cardData = [
    {
      dues: 1,
      pay: this.formInversion.value.value,
      units: Math.round(this.formInversion.value.value / this.unitValue),
      value: this.formInversion.value.dues > 1
        ? (this.formInversion.value.dues * 0.001) * this.unitValue + this.unitValue
        : this.unitValue,
      annualReturn: 15 - (15 * (this.formInversion.value.dues * 0.03))
    },
    {
      dues: 3,
      pay: this.formInversion.value.value,
      units: Math.round(this.formInversion.value.value / this.unitValue),
      value: this.formInversion.value.dues > 1
        ? (this.formInversion.value.dues * 0.001) * this.unitValue + this.unitValue
        : this.unitValue,
      annualReturn: 15 - (15 * (this.formInversion.value.dues * 0.03))
    },
    {
      dues: 6,
      pay: this.formInversion.value.value,
      units: Math.round(this.formInversion.value.value / this.unitValue),
      value: this.formInversion.value.dues > 1
        ? (this.formInversion.value.dues * 0.001) * this.unitValue + this.unitValue
        : this.unitValue,
      annualReturn: 15 - (15 * (this.formInversion.value.dues * 0.03))
    },
    {
      dues: 9,
      pay: this.formInversion.value.value,
      units: Math.round(this.formInversion.value.value / this.unitValue),
      value: this.formInversion.value.dues > 1
        ? (this.formInversion.value.dues * 0.001) * this.unitValue + this.unitValue
        : this.unitValue,
      annualReturn: 15 - (15 * (this.formInversion.value.dues * 0.03))
    },
  ]

  mapCuotas = {
    "=1": "1 mes",
    "other": "# meses"
  }

  total = 0;
  subtotal = 0;
  impuestosTarifas = 0;
  valorCuota = 0;

  paymentCards: PaymentCard[] = [
    { name: 'visa', selected: false },
    { name: 'pse', selected: false },
  ];


  constructor(private router: Router, private fb: FormBuilder) {}


  ngOnInit(): void {this.calcularMontos()}


  generarFecha(): Date {
    const fecha = new Date();

    fecha.setMonth(fecha.getMonth() + 1);

    return fecha;
  }

  clickAuth() {
    this.formInversion.patchValue({acceptTerms: !this.formInversion.value.acceptTerms})
  }

  activateCard(card: 'visa' | 'pse') {
    if (card == 'visa') {
      this.paymentCards[0].selected = true;
      this.paymentCards[1].selected = false;
      this.formInversion.patchValue({payment: 'visa'});
    }

    if (card == 'pse') {
      this.paymentCards[1].selected = true;
      this.paymentCards[0].selected = false;
      this.formInversion.patchValue({payment: 'pse'});
    }
    console.log(this.formInversion);
    this.calcularMontos()
  }

  clickSelectCuotas() {
    this.selectCuotasSelected = true;
    this.pagoUnicoSelected = false;
    this.calcularMontos()
  }

  clickPagoUnico() {
    this.selectCuotasSelected = false;
    this.pagoUnicoSelected = true;
    this.formInversion.patchValue({dues: 1});
    this.calcularMontos()
  }

  changeDues(event: CustomSelectElement) {
    this.formInversion.patchValue({dues: event.value});
    this.calcularMontos()
  }

  calcularMontos(){
    const inversion = this.formInversion.value.value ?? 0;

    const cuotas = this.formInversion.value.dues;
    const metodoPago = this.formInversion.value.payment;

    if( cuotas == 1 ){
      this.subtotal = inversion;
      this.valorCuota = inversion;
      this.total = inversion
    }
    else{
      this.subtotal = inversion + inversion * (cuotas * 0.01);
      this.valorCuota = this.subtotal / cuotas;
      this.total = this.valorCuota
    }


    this.impuestosTarifas = metodoPago == "visa" ? this.valorCuota * 0.025 : 0;

    this.total += this.impuestosTarifas

  }

  redireTo(path: string) {
    this.router.navigate([`${path}`]);
  }
}
