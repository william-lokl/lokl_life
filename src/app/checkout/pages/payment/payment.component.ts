import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { PaymentCard } from '../../interfaces/paymentCard.interface';
import { CustomSelectElement } from '../../interfaces/customSelectElement.interface';
import { ApiService } from 'src/app/services/api.service';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  selectedCountry: string = 'CO';
  selectedState: string = '';
  nameCity: string = '';
  selectedStateBank = new FormControl();
  selectedcity: any;
  opcionesSelect: any;

  body!: FormGroup;
  firstNameControl!: FormControl;
  address!: FormControl;
  state!: FormControl;
  city!: FormControl;
  document_number!: FormControl;
  phone!: FormControl;
  emailAdress!: FormControl;
  rut!: FormControl;
  document_type!: FormControl;
  type_person!: FormControl;

  inversionValue: number = 0;
  subtotal = 0;
  taxes: number = 0;
  type: number = 0;
  mapCuotas = {
    '=1': '1 mes',
    other: '# meses',
  };

  // ------------------ //

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private apiservice: ApiService
  ) {}

  ngOnInit(): void {
    this.body = this.fb.group({
      first_name: ['', Validators.required],
      address: ['', Validators.required],
      document_type: ['', Validators.required],
      document_number: ['', Validators.required],
      phone: ['', Validators.required],
      emailAdress: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
        ],
      ],
      type_person: ['', Validators.required],
      rut: [''],
    });

    this.firstNameControl = this.body.get('first_name') as FormControl;
    this.address = this.body.get('address') as FormControl;
    this.document_type = this.body.get('document_type') as FormControl;
    this.document_number = this.body.get('document_number') as FormControl;
    this.phone = this.body.get('phone') as FormControl;
    this.emailAdress = this.body.get('emailAdress') as FormControl;
    this.type_person = this.body.get('type_person') as FormControl;
    this.rut = this.body.get('rut') as FormControl;

    this.patchForm();
    this.fetchDocumentsTypes();
  }

  // ----------------------- //

  public fecha: Date = new Date();

  public formInversion: FormGroup = this.fb.group({
    value: ['', [Validators.min(11000000)]],
    dues: [0, [Validators.required]],
  });

  public opcionesSelectTypePerson: CustomSelectElement[] = [
    { name: 'Seleccione su tipo de persona', value: '', selected: false },
    { name: 'Persona natural', value: 0, selected: false },
    { name: 'Persona juridica', value: 1, selected: false },
  ];

  public opcionesSelectTypeDocument: CustomSelectElement[] = [
    { name: 'Seleccione su tipo de documento', value: '', selected: false },
    { name: 'Cédula de ciudadanía', value: 'CC', selected: false },
    { name: 'Cédula de extranjería', value: 'CCE', selected: false },
    { name: 'Pasaporte', value: 'PS', selected: false },
  ];

  public sendDataInvestment() {
    console.log(this.body.value);

    const token = localStorage.getItem('token');
    if (!token) return;
    const payload: any = jwt_decode.default(token);
    const reference =
      payload.id +
      '_632511ecd407318f2592f945_' +
      Math.random().toString().slice(-5, -1);

    let body = {
      bank_code: this?.selectedStateBank.value,
      name: this.body.get('first_name')?.value,
      address: this.body.get('address')?.value,
      region: this?.selectedState,
      city: this?.nameCity,
      type_client: this.body.get('type_person')?.value,
      type_document: this.body.get('document_type')?.value,
      number_document: this.body.get('document_number')?.value,
      number: this.body.get('phone')?.value,
      email: this.body.get('emailAdress')?.value,
      redirect_url: 'https://lokl.life/payment/successful',
      reference: reference,
      amount: this.inversionValue,
      type: this.type,
      info_subcripcion: [
        {
          owner: '646fcef8c158685da367ec02',
          project: '63261a94c8011a8a836fda23',
          inversion: this.inversionValue,
          impuestos: this.taxes,
          meses: this.formInversion.value.dues,
          valor_mes: this.subtotal,
        },
      ],
      installments: '6',
      prepayment: 0,
    };

    this.apiservice.post(`transaction`, body).subscribe(
      (res: any) => {
        console.log(res);

        if (res) {
          if (this.type === 0) {
            const id = res?.data?.data?.id;
            setTimeout(() => {
              this.redirectPse(id);
            }, 2000);
          }
        }
      },
      (error: any) => {
        console.log('error en enviar data', error);
      }
    );
  }

  redirectPse(id: string) {
    const apiUrl = `https://sandbox.wompi.co/v1/transactions/${id}`;

    // token Bearer
    const bearerToken = 'pub_test_srHBcxqYISn8FsYZLuSWeOmhU679yCV5';

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${bearerToken}`,
      }),
    };

    this.http.get<any[]>(apiUrl, httpOptions).subscribe(
      (resPse: any) => {
        console.log('resPse', resPse);

        if (resPse) {
          if (resPse?.data?.status === 'APPROVED') {
            let url = resPse?.data?.payment_method?.extra?.async_payment_url;

            if (url !== null || url !== undefined) {
              window.location.href = url;
            } else {
              window.location.href = `${origin}/payment/error`;
            }
          }
        }
      },
      (error) => {
        console.error('Error al obtener los documentos:', error);
      }
    );
  }

  paymentCards: PaymentCard[] = [];

  generarFecha(): Date {
    const fecha = new Date();
    fecha.setMonth(fecha.getMonth() + 1);

    return fecha;
  }

  changeDues(event: any) {
    this.body.patchValue({ document_type: event.value });
  }

  changeTypePerson(event: any) {
    this.body.patchValue({ type_person: event.value });
  }

  private patchForm() {
    let first_name = localStorage?.getItem('first_name');
    let last_name = localStorage?.getItem('last_name');
    let address = localStorage?.getItem('address');
    let document_type = localStorage?.getItem('document_type');
    let document_number = localStorage?.getItem('document_number');
    let phone = localStorage?.getItem('phone');
    let months = localStorage?.getItem('months');
    let investment = localStorage?.getItem('investment_total');
    let type = localStorage?.getItem('type');
    let taxes = localStorage?.getItem('taxes');

    if (Number(type) === 1) {
      this.paymentCards = [{ name: 'visa', selected: true }];
    } else {
      this.paymentCards = [{ name: 'pse', selected: true }];
    }

    this.opcionesSelectTypeDocument.forEach((doc) => {
      if (doc?.value === document_type) {
        doc.selected = true;
      }
    });

    this.body.patchValue({
      first_name: `${first_name ?? ''} ${last_name ?? ''}`,
    });
    this.body.patchValue({ address });
    this.body.patchValue({ document_number });
    this.body.patchValue({ phone });
    this.body.patchValue({ document_type });

    this.formInversion.value.dues = months;
    this.inversionValue = Number(investment) ?? 0;
    this.subtotal = Number(investment) / Number(months) ?? 0;
    this.taxes = Number(taxes) ?? 0;
    this.type = Number(type) ?? 0;
  }

  fetchDocumentsTypes() {
    this.opcionesSelect = [];
    const apiUrl = 'https://sandbox.wompi.co/v1/pse/financial_institutions';

    // token Bearer
    const bearerToken = 'pub_test_srHBcxqYISn8FsYZLuSWeOmhU679yCV5';

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${bearerToken}`,
      }),
    };

    this.http.get<any[]>(apiUrl, httpOptions).subscribe(
      (documentsData: any) => {
        const dataOptions = documentsData?.data?.map((item: any) => {
          return {
            name: item?.financial_institution_name,
            value: item?.financial_institution_code,
            selected: false,
          };
        });

        this.opcionesSelect = [...this.opcionesSelect, ...dataOptions];
      },
      (error) => {
        console.error('Error al obtener los documentos:', error);
      }
    );
  }

  onValorCambiado(event: any) {
    this.selectedCountry = event.valor.iso2;
  }

  stateChange(event: any) {
    this.selectedState = event.valor.iso2;
    this.nameCity = event.valor.name;
  }

  cityChange(event: any) {
    this.selectedcity = event.valor.name;
  }

  onStateChange(event: any) {
    console.log(event);
  }
}

