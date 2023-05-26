import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import {
  FormGroup,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LoadingService } from 'src/app/services/loading.service';
import { ApiService } from 'src/app/services/api.service';

import { HotToastService } from '@ngneat/hot-toast';
import Swiper, { Navigation, Pagination, Autoplay } from 'swiper';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

// configure Swiper to use modules
Swiper.use([Navigation, Pagination, Autoplay]);

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  login: any = {
    terminal: '',
    password: '',
  };

  /**Variables usadas para pasos de preregistro */
  paso1: boolean = true;
  paso2: boolean = false;
  paso3: boolean = false;
  paso4: boolean = false;
  titlePreregistro: string = 'Datos personales';



  loginForm!: UntypedFormGroup;
  toastRef: any;

  registerForm!: FormGroup;

  images: any = [];
  currentStepIndex = 0;

  constructor(
    public router: Router,
    private formBuilder: UntypedFormBuilder,
    private authService: AuthService,
    public loading: LoadingService,
    private apiService: ApiService,
    private toastService: HotToastService,
    private modalService: NgbModal,
    private modalConfig: NgbModalConfig
  ) {
    modalConfig.backdrop = 'static';
  }

  async ngOnInit() {
    this.loginForm = this.formBuilder.group({
      terminal: new UntypedFormControl('', Validators.compose([Validators.required])),
      password: new UntypedFormControl('', Validators.compose([Validators.required])),
    });

    this.registerForm = this.formBuilder.group({
      firstname: new UntypedFormControl('', Validators.compose([Validators.required])),
      lastname: new UntypedFormControl('', Validators.compose([Validators.required])),
      cellphone: new UntypedFormControl('', Validators.compose([Validators.required])),
      email: new UntypedFormControl('', Validators.compose([Validators.required])),
      nomComercial: new UntypedFormControl('', Validators.compose([Validators.required])),
      nomLegal: new UntypedFormControl('', Validators.compose([Validators.required])),
      address: new UntypedFormControl('', Validators.compose([Validators.required])),
      country: new UntypedFormControl('', Validators.compose([Validators.required])),
    });

    await this.getBanners();
  }

  clickfunc() {
    let objLogin: any = {
      dispositivo: this.login.terminal,
      clave: this.login.password,
    };

    this.authService.login(objLogin).subscribe(
      (res: any) => {
        if (res.status) {
          localStorage.setItem('banner', '2');
          window.location.href = window.location.href = '#/dashboard';
        } else {
          let log = '';
          if (res.message) {
            if (typeof res.message === 'object') {
              log =
                '¡Lo sentimos! Estamos presentando problemas. Intenta más tarde';
            } else {
              log = res.message;
            }
          } else {
            log =
              '¡Lo sentimos! Estamos presentando problemas. Intenta más tarde';
          }
          this.showError(log);
          console.log(log);
        }
      },
      (error: any) => {
        this.showError('Su email ó contraseña son inválidos');
        console.log('error en el login', error);
      }
    );
  }

  async getBanners() {
    const loading: any = this.loading.show(
      'Cargando banners, por favor espere...'
    );

    let promise = new Promise((resolve, reject) => {
      this.apiService.get(`/menus/getbanner/1`).subscribe(
        async (res: any) => {
          loading.close();
          if (res.status === 202) this.showError(res.message);
          else if (!res.status) this.showError(res.message);
          else if (res.status === 404) this.showError(res.message);
          else if (res.data.length === 0) {
            //this.showError('No se tiene informacion de los banner');
          } else {
            this.images = res.data;
          }
        },
        (error: any) => {
          loading.close();
          console.log('Error consultando informacion', error);
          this.showError(error);
          reject(error);
        }
      );
    });
    return promise;
  }

  onSwiper([swiper]: any) {
    console.log(swiper);
  }
  onSlideChange() {
    console.log('slide change');
  }

  showError(error: any) {
    this.toastService.error(
      typeof error === 'object'
        ? '¡Lo sentimos! Estamos presentando problemas. Intenta más tarde'
        : error
    );
  }

  //abrir modal de informacion
  async openModal(content?: any) {
    this.modalService.open(content, { centered: true, size: 'sm' });

  }
  async cerrarmodal() {

    this.modalService.dismissAll();
    this.paso1 = true;
    this.paso2 = false;
    this.paso3 = false;
    this.paso4 = false;
    this.titlePreregistro = 'Datos personales';
  }

  nextStep() {

    console.log(this.registerForm.value);

    if (this.paso1 == true) {
      this.paso1 = false;
      this.paso2 = true;
      this.titlePreregistro = 'Datos Comerciales';
      return
    }
    if (this.paso2 == true) {
      this.paso2 = false;
      this.paso3 = true;
      this.titlePreregistro = 'confirmación y envío';
      return
    }
    if (this.paso3 == true) {
      this.paso3 = false;
      this.paso4 = true;
      this.titlePreregistro = 'Gracias';
      return
    }
  }

  sendInfo() {

    console.log(this.registerForm.value);

    this.apiService.post('/user/pre-register', this.registerForm.value).subscribe(
      async (res: any) => {
        if (res.status === 202) this.showError(res.message);
        else if (!res.status) this.showError(res.message);
        else if (res.status === 404) this.showError(res.message);
        else {
          this.paso3 = false;
          this.paso4 = true;
        }

      },
      (error: any) => {
        console.log(error);
      }
    );

  }

  backStep() {

    if (this.paso3 == true) {
      this.paso3 = false;
      this.paso2 = true;
      this.titlePreregistro = 'Datos Comerciales';
      return
    }

    if (this.paso2 == true) {
      this.paso2 = false;
      this.paso1 = true;
      this.titlePreregistro = 'Datos personales';
      return
    }
  }
}
