import { Component, ElementRef, HostListener, OnInit } from '@angular/core';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { PaymentCard } from '../../interfaces/paymentCard.interface';
import { CustomSelectElement } from '../../interfaces/customSelectElement.interface';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  public fecha: Date = new Date();

  validatingTransaction: boolean = false;

  subSelectTypeDocument: Subject<boolean> = new Subject<boolean>();
  $selectTypeDocument: Observable<boolean> = this.subSelectTypeDocument.asObservable();

  subSelectTypePerson: Subject<boolean> = new Subject<boolean>();
  $selectTypePerson: Observable<boolean> = this.subSelectTypeDocument.asObservable();

  public formInversion: FormGroup = this.fb.group({
    value: [110000140, [Validators.min(11000000)]],
    dues: [1, [Validators.required]],
    payment: ['', [Validators.required]],
    acceptTerms: [false, [Validators.requiredTrue]],
  });

  public opcionesSelect: CustomSelectElement[] = [
    { name: 'A continuación seleccione su banco', value: '', selected: false },
    { name: 'BAN100', value: 1, selected: false },
    { name: 'BANCAMIA S.A.', value: 2, selected: false },
  ];

  public opcionesSelectState: CustomSelectElement[] = [
    { name: 'Departamento', value: '', selected: false },
    { name: 'Amazonas', value: 1, selected: false },
    { name: 'Antioquia', value: 2, selected: false },
    { name: 'Arauca', value: 3, selected: false },
  ];
  public opcionesSelectCity: CustomSelectElement[] = [
    { name: 'Ciudad', value: '', selected: false },
    { name: 'Bogota', value: 1, selected: false },
    { name: 'Medellin', value: 2, selected: false },
    { name: 'Ibague', value: 3, selected: false },
  ];
  public opcionesSelectTypePerson: CustomSelectElement[] = [
    { name: 'Seleccione su tipo de persona', value: '', selected: false },
    { name: 'Persona natural', value: 1, selected: false },
    { name: 'Persona juridica', value: 2, selected: false },
  ];
  public opcionesSelectTypeDocument: CustomSelectElement[] = [
    { name: 'Seleccione su tipo de documento', value: '', selected: false },
    { name: 'Cédula de ciudadanía', value: 1, selected: false },
    { name: 'Cédula de extranjería', value: 2, selected: false },
    { name: 'Pasaporte', value: 3, selected: false },
  ];

  body!: FormGroup;
  firstNameControl!: FormControl;
  homeAdress!: FormControl;
  state!: FormControl;
  city!: FormControl;
  numberDocument!: FormControl;
  numberPhone!: FormControl;
  emailAdress!: FormControl;
  rut!: FormControl;

  paymentCards: PaymentCard[] = [
    { name: 'pse', selected: true },
  ];

  onfocusSelects(){
    this.subSelectTypeDocument.next(false)
    this.subSelectTypePerson.next(false)
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
  }

  generarFecha(): Date {
    const fecha = new Date();

    fecha.setMonth(fecha.getMonth() + 1);

    return fecha;
  }

  changeDues(event: any) {
    console.log(event);
  }

  submit(){
    this.validatingTransaction = true
    setTimeout(
      () => this.validatingTransaction = false,
      30000
    )
  }

  constructor(private fb: FormBuilder, private elementRef: ElementRef) {}

  ngOnInit(): void {}

}
