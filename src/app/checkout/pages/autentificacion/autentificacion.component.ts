import { HttpClient } from '@angular/common/http';
import {
  Component,
  HostListener,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { Observable } from 'rxjs';
import { CustomSelectElement } from '../../interfaces/customSelectElement.interface';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-autentificacion',
  templateUrl: './autentificacion.component.html',
  styleUrls: ['./autentificacion.component.scss'],
})
export class AutentificacionComponent implements OnInit {
  resolucion_movil: boolean = false;
  countries: any[] = [];
  selectedCountry: string = 'Colombia';
  cities: string[] = [];
  paso1: boolean = true;
  paso2: boolean = false;
  paso3: boolean = false;

  body!: FormGroup;
  firstNameControl!: FormControl;
  last_name!: FormControl;
  document_date!: FormControl;
  document_type!: FormControl;
  document_number!: FormControl;
  address!: FormControl;
  referral_code!: FormControl;
  phone!: FormControl;
  valorCheckboxControl: FormControl = new FormControl(false);

  modalRef!: NgbModalRef;

  public opcionesSelect: CustomSelectElement[] = [
    { name: 'Cédula de Ciudadania', value: 'CC', selected: true },
    { name: 'Cédula de Extranjeria', value: 'CCE', selected: false },
    { name: 'Pasaporte', value: 'PS', selected: false },
  ];
  inputActivated: boolean = false;
  constructor(
    private http: HttpClient,
    public fb: FormBuilder,
    private modalService: NgbModal,
    private apiservice: ApiService
  ) {}
  @ViewChild('content', { static: false }) modalContent!: TemplateRef<any>;
  @HostListener('window:resize', ['$event'])
  onWindowResize(event: Event) {
    const newWidth = (event.target as Window).innerWidth;
    const newHeight = (event.target as Window).innerHeight;
    // Tu lógica para manejar el cambio de resolución
    console.log(`Nueva resolución: ${newWidth}x${newHeight}`);

    if (newWidth < 992) {
      this.resolucion_movil = true;
      console.log(this.resolucion_movil);
    }

    if (newWidth > 992) {
      this.resolucion_movil = false;
      this.paso1 = true;
      this.paso2 = false;
      this.paso3 = false;
      console.log(this.resolucion_movil);
    }
  }

  ngOnInit(): void {
    const initialWidth = window.innerWidth;
    const initialHeight = window.innerHeight;
    console.log(initialWidth);
    console.log(initialHeight);

    if (initialWidth < 992) {
      this.resolucion_movil = true;
      console.log(this.resolucion_movil);
    }

    if (initialWidth > 992) {
      this.resolucion_movil = false;
      console.log(this.resolucion_movil);
    }

    this.body = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      document_date: ['', Validators.required],
      document_type: ['', Validators.required],
      document_number: ['', Validators.required],
      address: ['', Validators.required],
      document_front: ['', Validators.required],
      document_back: ['', Validators.required],
      referral_code: [''],
      phone: ['', Validators.required],

      reference_pay: ['', Validators.required], //juanito
      units: ['', Validators.required], // juanito
      investment: ['', Validators.required], // juanito
      type: ['', Validators.required], // tipo de pago juanito
      inversion_total: ['', Validators.required], // juanito
      meses: ['', Validators.required], // juanito
      valor_mes: ['', Validators.required], // juanito
    });

    this.firstNameControl = this.body.get('first_name') as FormControl;
    this.last_name = this.body.get('last_name') as FormControl;
    this.document_date = this.body.get('document_date') as FormControl;
    this.document_type = this.body.get('document_type') as FormControl;
    this.document_number = this.body.get('document_number') as FormControl;
    this.address = this.body.get('address') as FormControl;
    this.referral_code = this.body.get('referral_code') as FormControl;
    this.phone = this.body.get('phone') as FormControl;

    this.patchForm();
    this.fetchCountries();
    //this.onSelectCountry();
  }

  public changeStep() {
    if (this.paso1) {
      this.paso1 = false;
      this.paso2 = true;
      return;
    }

    if (this.paso2) {
      this.paso2 = false;
      this.paso3 = true;
      return;
    }
  }

  fetchCountries() {
    const apiUrl = 'https://restcountries.com/v3.1/all';
    this.http.get<any[]>(apiUrl).subscribe(
      (countriesData) => {
        countriesData.map((country) => {
          /* console.log(country.name.common); */
          let obj = {
            name: country?.name?.common,
            value: country?.name?.common,
            selected: false,
          };
          this.countries.push(country.name.common);
        });
        this.countries.sort();
      },
      (error) => {
        console.error('Error al obtener los países:', error);
      }
    );
  }

  onSelectCountry(): void {
    if (this.selectedCountry) {
      this.http
        .get<any[]>(
          ` https://api.teleport.org/api/cities/?search=${this.selectedCountry}`
        )
        .subscribe(
          (res) => {
            //console.log(res);
          },
          (error) => {
            console.error('Error al obtener las ciudades:', error);
          }
        );
    } else {
      this.cities = [];
    }
  }

  changeDues(event: any) {
    console.log(event);
    this.body.patchValue({ document_type: event.value });
  }

  private patchForm() {
    let first_name = localStorage.getItem('first_name');
    let last_name = localStorage.getItem('last_name');
    let document_type = localStorage.getItem('document_type');
    let document_number = localStorage.getItem('document_number');
    let phone = localStorage.getItem('phone');
    let address = localStorage.getItem('address');

    this.opcionesSelect.forEach((item) => {
      if (item.value == document_type) {
        item.selected = true;
      }
    });

    this.body.patchValue({ first_name });
    this.body.patchValue({ last_name });
    this.body.patchValue({ document_type });
    this.body.patchValue({ document_number });
    this.body.patchValue({ phone });
    this.body.patchValue({ address });
  }

  inputFocus() {
    this.inputActivated = true;
  }

  inputBlur() {
    this.inputActivated = false;
  }

  //abrir modal de informacion
  public async openModal(content?: any) {
    this.modalService.open(content, { centered: true, size: 'sm' });
  }

  public sendData() {
    console.log('Valor del checkbox: ' + this.valorCheckboxControl.value);
    let reference_pay = localStorage.getItem('reference_pay');
    let units = localStorage.getItem('units');
    let investment = localStorage.getItem('investment');
    let type = localStorage.getItem('type');
    let inversion_total = localStorage.getItem('inversion_total');
    let impuestos = localStorage.getItem('impuestos');
    let meses = localStorage.getItem('meses');
    let valor_mes = localStorage.getItem('valor_mes');
    let date = moment(this.body.get('document_date')?.value).format(
      'MM-DD-YYYY'
    );
    let body = {
      first_name: this.body.get('first_name')?.value,
      last_name: this.body.get('last_name')?.value,
      document_type: this.body.get('document_type')?.value,
      document_number: this.body.get('document_number')?.value,
      document_date: date,
      address: this.body.get('address')?.value,
      document_front: '',
      document_back: '',
      referral_code: this.body.get('referral_code')?.value,
      phone: this.body.get('phone')?.value,
      reference_pay: reference_pay,
      units: units,
      investment: investment,
      type: type,
      inversion_total: inversion_total,
      impuestos: impuestos,
      meses: meses,
      valor_mes: valor_mes,
    };

    this.modalRef = this.modalService.open(this.modalContent, {
      centered: true,
      size: 'sm',
    });

    this.apiservice.post(`sign-contract/1`, body).subscribe(
      (res: any) => {
        console.log(res);
      },
      (error: any) => {
        console.log('error en enviar data', error);
      }
    );
  }

  public async cerrarmodal() {
    this.modalService.dismissAll();
  }
}
