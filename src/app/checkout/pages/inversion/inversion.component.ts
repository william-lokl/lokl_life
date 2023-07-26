import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { PaymentCard } from '../../interfaces/paymentCard.interface';
import { CustomSelectElement } from '../../interfaces/customSelectElement.interface';
import {
  ActivatedRoute,
  Router,
} from '@angular/router';

import * as jwt_decode from 'jwt-decode';
import { ApiService } from 'src/app/services/api.service';
import { Carousel } from 'primeng/carousel';
import { Observable, Subject, delay } from 'rxjs';
import { CardDataElement } from '../../interfaces/cardDataElement.interface';

@Component({
  selector: 'app-inversion',
  templateUrl: './inversion.component.html',
  styleUrls: ['./inversion.component.scss'],
})
export class InversionComponent implements OnInit {
  public fecha: Date = new Date();
  public fechaEnMes: Date = this.generarFecha();
  public fechaFinMes: Date = this.getLastDayOfMonth()
  public pagoUnicoSelected: boolean = false;
  public selectCuotasSelected: boolean = false;
  public unitValue: number = 112000;
  public resolucion_movil: boolean = false;
  public widthActual: number = 0;
  public cardsCount: number = 2;
  public opcionesSelect: CustomSelectElement[] = [
    { name: '3 meses', value: 3, selected: true },
    { name: '6 meses', value: 6, selected: false },
    { name: '9 meses', value: 9, selected: false },
  ];
  public formInversion: FormGroup = this.fb.group({
    value: [1120000, []],
    dues: [1 , [Validators.required]],
    payment: ['', [Validators.required] ],
    acceptTerms: [false, [Validators.requiredTrue] ],
  });

  public subSelectSelected: Subject<boolean> = new Subject<boolean>();
  public $selectSelected: Observable<boolean> = this.subSelectSelected.asObservable()

  public inputActivated: boolean = false;

  public cardData: CardDataElement[] = [];

  step1: boolean = true;
  step2: boolean = false;

  mapCuotas = {
    '=1': '1 mes',
    other: '# meses',
  };

  @ViewChild('carouselP') carousel!: Carousel;

  total = 0;
  subtotal = 0;
  impuestosTarifas = 0;
  valorCuota = 0;
  currentUnits = 0;

  paymentCards: PaymentCard[] = [
    { name: 'visa', selected: false },
    { name: 'pse', selected: false },
  ];
  token: string | null = '';
  constructor(
    private apiservice: ApiService,
    private router: Router,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) {}


  @HostListener('window:resize', ['$event'])
  onWindowResize(event: Event) {
    const newWidth = (event.target as Window).innerWidth;
    const newHeight = (event.target as Window).innerHeight;


    if (newWidth < 992) {
      this.resolucion_movil = true;
    }

    if (newWidth > 992) {
      this.resolucion_movil = false;
      this.step2 = false;
    }

    this.widthActual = newWidth;
    this.acomodarCarousel(newWidth)

  }

  acomodarCarousel(widthActual: number){
    if( widthActual > 880 ) this.cardsCount = 3;
    if( widthActual < 880 && widthActual > 720 ) this.cardsCount = 2;
    if( widthActual < 720 ) this.cardsCount = 1;
  }



  ngOnInit(): void {
    this.calcularMontos();
    this.pagoUnicoSelected = true


    const initialWidth = window.innerWidth;
    const initialHeight = window.innerHeight;

    this.acomodarCarousel(initialWidth)

    if (initialWidth < 992) {
      this.resolucion_movil = true;
      console.log(this.resolucion_movil);
    }

    if (initialWidth > 992) {
      this.resolucion_movil = false;
      console.log(this.resolucion_movil);
    }

    this.token = this.activatedRoute.snapshot.queryParamMap.get('token');

    if (this.token) {
      localStorage.setItem('token', `${this.token}`);
    }

    this.getDataUser();
  }

  private getDataUser() {
    this.token = localStorage.getItem('token');
    if (this.token) {
      const payload: any = jwt_decode.default(this.token!);
      console.log(payload);

      this.apiservice.get(`owners/${payload.id}`).subscribe(
        (res: any) => {
          console.log(res);
          localStorage.setItem('first_name', `${res.data.first_name}`);
          localStorage.setItem('last_name', `${res.data.last_name}`);
          localStorage.setItem('document_type', `${res.data.document_type}`);
          localStorage.setItem(
            'document_number',
            `${res.data.document_number}`
          );
          localStorage.setItem('phone', `${res.data.phone}`);
          localStorage.setItem('address', `${res.data.address}`);
        },
        (error: any) => {
          console.log('error en consultar data', error);
        }
      );
    }
  }

  generarFecha(): Date {
    const fecha = new Date();

    fecha.setMonth(fecha.getMonth() + 1);

    return fecha;
  }

  clickAuth() {
    this.formInversion.patchValue({
      acceptTerms: !this.formInversion.value.acceptTerms,
    });
  }

  nextStep(){
    if(!this.formInversion.controls['value'].valid) return

    this.step1 = false;
    this.step2 = true;
  }

  getLastDayOfMonth(): Date {
    const hoy = new Date();
    const anio = hoy.getFullYear();
    const mes = hoy.getMonth();

    const primerDiaDelProximoMes = new Date(anio, mes + 1, 1);

    const ultimoDiaDelMes = new Date(primerDiaDelProximoMes.getTime() - 1);

    return ultimoDiaDelMes;
  }

  getIndexByCards(i: number): number{
    if (i == 1) return 0
    if (i == 3) return 1
    if (i == 6) return 2
    if (i == 9) return 3
    return 0
  }

  getCardByIndex(i: number): number{
    if( i == 0 ) return 1
    if( i == 1 ) return 3
    if( i == 2 ) return 6
    if( i == 3 ) return 9
    return 0
  }

  activateCard(card: 'visa' | 'pse') {
    if (card == 'visa') {
      this.paymentCards[0].selected = true;
      this.paymentCards[1].selected = false;
      this.formInversion.patchValue({ payment: 'visa' });
    }

    if (card == 'pse') {
      this.paymentCards[1].selected = true;
      this.paymentCards[0].selected = false;
      this.formInversion.patchValue({ payment: 'pse' });
    }
    this.calcularMontos();
  }

  clickSelectCuotas() {
    this.calcularMontos();
    this.verificarSelected()
  }

  clickPagoUnico() {
    this.formInversion.patchValue({ dues: 1 });
    this.calcularMontos();
    this.verificarSelected()
  }

  verificarSelected(){
    if( this.formInversion.value.dues == 1 ) {
      this.carousel.page = 0;
      this.pagoUnicoSelected = true;
      this.subSelectSelected.next(false);
    }

    if( this.formInversion.value.dues > 1 ) {
      this.carousel.page = this.getIndexByCards(this.formInversion.value.dues);
      this.pagoUnicoSelected = false
      this.subSelectSelected.next(true);
    }
  }

  changeDues(event: CustomSelectElement) {
    this.formInversion.patchValue({ dues: event.value });
    this.verificarSelected()
    this.calcularMontos();
  }

  calcularMontos() {

    const inversion = this.formInversion.value.value;

    const cuotas = this.formInversion.value.dues;
    const metodoPago = this.formInversion.value.payment;

    if (cuotas == 1) {
      this.subtotal = inversion;
      this.valorCuota = inversion;
      this.total = inversion;
    } else {
      this.subtotal = (inversion + inversion * (cuotas * 0.01))/cuotas;
      this.valorCuota = this.subtotal / cuotas;
      this.total = this.valorCuota;
    }

    this.currentUnits = Math.round(inversion / this.unitValue)

    this.impuestosTarifas = metodoPago == 'visa' ? this.valorCuota * 0.025 : 0;

    this.total += this.impuestosTarifas;

    this.generarCards()
  }

  submit(){

    if( !this.formInversion.valid ) return;

    this.redirectTo('checkout/personal-data')

    localStorage.setItem('reference_pay', "") //TODO: logica de referencias
    localStorage.setItem('units', this.currentUnits.toString())
    localStorage.setItem('investment', this.total.toString())
    localStorage.setItem('type', "") //TODO: averiguar
    localStorage.setItem('inversion_total', this.formInversion.value.value.toString())
    localStorage.setItem('meses', this.formInversion.value.dues.toString())
    localStorage.setItem('valor_mes', this.valorCuota.toString())
    localStorage.setItem("impuestos", this.impuestosTarifas.toString())


  }

  proximaTarjeta(){

    if( this.carousel.page < this.cardData.length - 1) this.carousel.page++
    this.formInversion.value.dues = this.getCardByIndex(this.carousel.page)

  }

  anteriorTarjeta(){

    if( this.carousel.page > 0) --this.carousel.page
    this.formInversion.value.dues = this.getCardByIndex(this.carousel.page)

  }

  inputFocus(){
    this.inputActivated = true
  }

  inputBlur(){
    this.inputActivated = false
  }

  redirectTo(path: string) {
    this.router.navigate([`${path}`]);
  }

  getValueDue(due: number): number{
    const inversion = Number(this.formInversion.value.value);
    const interes = due * 0.01;
    const totalConInteres = inversion + (inversion * interes);
    const totalCuota = totalConInteres / due;

    return(totalCuota)
  }

  getValueUnit(due: number):number{
    if( due == 1 ) return this.unitValue
    return this.unitValue + (this.unitValue * (0.01 * due))
  }

  inputValue(){
    this.calcularMontos()
  }

  generarCards(){
    this.cardData = [
      {
        dues: 1,
        pay: this.formInversion.value.value,
        units: Math.round(this.formInversion.value.value / this.unitValue),
        value: this.getValueUnit(1),
        annualReturn: 150,
      },
      {
        dues: 3,
        pay: this.getValueDue(3),
        units: Math.round(this.formInversion.value.value / this.unitValue),
        value: this.getValueUnit(3),
        annualReturn: 150 - 150 * (0.029),
      },
      {
        dues: 6,
        pay: this.getValueDue(6),
        units: Math.round(this.formInversion.value.value / this.unitValue),
        value: this.getValueUnit(6),
        annualReturn: 150 - 150 * (0.05664),
      },
      {
        dues: 9,
        pay: this.getValueDue(9),
        units: Math.round(this.formInversion.value.value / this.unitValue),
        value: this.getValueUnit(9),
        annualReturn: 150 - 150 * (0.097),
      },
    ];
  }
}
