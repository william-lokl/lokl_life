import { HttpClient } from '@angular/common/http';
import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  Renderer2,
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
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-autentificacion',
  templateUrl: './autentificacion.component.html',
  styleUrls: ['./autentificacion.component.scss'],
})
export class AutentificacionComponent implements OnInit {
  secondsLeft = 30;
  intervalId: any;
  resolucion_movil: boolean = false;
  selectedCountry: string = 'CO';
  selectedState: string = '';
  selectedcity: any;
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

  modalRef!: any;
  public opcionesSelect: CustomSelectElement[] = [
    { name: 'Cédula de Ciudadania', value: 'CC', selected: true },
    { name: 'Cédula de Extranjeria', value: 'CCE', selected: false },
    { name: 'Pasaporte', value: 'PS', selected: false },
  ];
  inputActivated: boolean = false;

  /*Variables recibidas por Url */
  code: string | null = '';
  reference: string | null = '';
  amount: string | null = '';
  type: string | null = '';
  inversion_total: string | null = '';
  impuestos: string | null = '';
  meses: string | null = '';
  valor_mes: string | null = '';
  token: string | null = '';
  /********/

  constructor(
    public fb: FormBuilder,
    private modalService: NgbModal,
    private apiservice: ApiService,
    private renderer: Renderer2,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}
  @ViewChild('content', { static: false }) modalContent!: TemplateRef<any>;
  @ViewChild('modalfirmado', { static: false }) modalfirmado!: TemplateRef<any>;
  @ViewChild('codigoinvalido', { static: false })
  codigoinvalido!: TemplateRef<any>;
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
    if (initialWidth < 992) {
      this.resolucion_movil = true;
    }
    if (initialWidth > 992) {
      this.resolucion_movil = false;
    }

    this.body = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      document_date: ['', Validators.required],
      document_type: ['', Validators.required],
      document_number: ['', Validators.required],
      address: ['', Validators.required],
      document_front: [''],
      document_back: [''],
      referral_code: [''],
      phone: ['', Validators.required],
    });

    this.firstNameControl = this.body.get('first_name') as FormControl;
    this.last_name = this.body.get('last_name') as FormControl;
    this.document_date = this.body.get('document_date') as FormControl;
    this.document_type = this.body.get('document_type') as FormControl;
    this.document_number = this.body.get('document_number') as FormControl;
    this.address = this.body.get('address') as FormControl;
    this.referral_code = this.body.get('referral_code') as FormControl;
    this.phone = this.body.get('phone') as FormControl;

    this.code = this.activatedRoute.snapshot.queryParamMap.get('code');
    this.reference =
      this.activatedRoute.snapshot.queryParamMap.get('reference');
    this.amount = this.activatedRoute.snapshot.queryParamMap.get('amount');
    this.type = this.activatedRoute.snapshot.queryParamMap.get('type');
    this.inversion_total =
      this.activatedRoute.snapshot.queryParamMap.get('inversion_total');
    this.impuestos =
      this.activatedRoute.snapshot.queryParamMap.get('impuestos');
    this.meses = this.activatedRoute.snapshot.queryParamMap.get('meses');
    this.valor_mes =
      this.activatedRoute.snapshot.queryParamMap.get('valor_mes');
    this.valor_mes =
      this.activatedRoute.snapshot.queryParamMap.get('valor_mes');

    this.token = this.activatedRoute.snapshot.queryParamMap.get('token');

    if (this.token) {
      localStorage.setItem('token', `${this.token}`);
    }

    this.patchForm();
  }

  ngAfterViewInit(): void {
    this.ValidateParams();
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

  startCountdown() {
    this.intervalId = setInterval(() => {
      this.secondsLeft--;

      if (this.secondsLeft <= 0) {
        this.secondsLeft = 30;
      }
    }, 1000);
  }

  //abrir modal de informacion
  public async openModal(content?: any) {
    this.modalService.open(content, {
      centered: true,
      size: 'sm',
      backdrop: 'static',
      keyboard: false,
      windowClass: 'custom-modal-open',
    });
    this.renderer.addClass(document.body, 'custom-modal-open');
  }

  public async errorModal(content?: any) {
    this.modalService.open(content, {
      centered: true,
      size: 'sm',
      windowClass: 'error-modal',
    });
    this.renderer.addClass(document.body, 'error-modal');
  }

  private ValidateParams() {
    if (
      this.code &&
      this.reference &&
      this.amount &&
      this.type &&
      this.impuestos &&
      this.meses &&
      this.valor_mes
    ) {
      localStorage.setItem('taxes', this.impuestos);
      localStorage.setItem('investment', this.amount);
      localStorage.setItem('type', this.type);
      localStorage.setItem('months', this.meses);
      localStorage.setItem('month_value', this.valor_mes);

      let body = {
        code: this.code,
      };
      this.apiservice.post(`sign-contract/2`, body).subscribe(
        (res: any) => {
          console.log(res);
          if (res.message == 'OTP Invalido o ya fue usado') {
            this.errorModal(this.codigoinvalido);
          } else {
            this.openModal(this.modalfirmado);
          }
        },
        (error: any) => {
          console.log('error en enviar data', error);
        }
      );
    }
  }

  public sendData() {
    let reference_pay = localStorage.getItem('reference_pay');
    let units = localStorage.getItem('units');
    let investment = localStorage.getItem('investment');
    let type = localStorage.getItem('type');
    let investment_total = localStorage.getItem('investment_total');
    let impuestos = localStorage.getItem('impuestos');
    let months = localStorage.getItem('months');
    let month_value = localStorage.getItem('month_value');
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
      inversion_total: investment_total,
      impuestos: impuestos,
      meses: months,
      valor_mes: month_value,
    };
    this.apiservice.post(`sign-contract/1`, body).subscribe(
      (res: any) => {
        console.log(res);
        this.openModal(this.modalContent);
        this.startCountdown();
      },
      (error: any) => {
        console.log('error en enviar data', error);
      }
    );
  }

  public async cerrarmodal() {
    this.modalService.dismissAll();
  }

  onValorCambiado(event: any) {
    this.selectedCountry = event.valor.iso2;
  }

  stateChange(event: any) {
    this.selectedState = event.valor.iso2;
  }

  cityChange(event: any) {
    this.selectedcity = event.valor.name;
  }
  redireTo(path: string) {
    this.router.navigate([`${path}`]);
    this.cerrarmodal();
  }
}
