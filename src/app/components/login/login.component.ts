import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LoadingService } from 'src/app/services/loading.service';
import { ApiService } from 'src/app/services/api.service';

import { HotToastService } from '@ngneat/hot-toast';
import Swiper, { Navigation, Pagination, Autoplay } from 'swiper';

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

  loginForm!: FormGroup;
  toastRef: any;

  images: any = [];

  constructor(
    public router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    public loading: LoadingService,
    private apiService: ApiService,
    private toastService: HotToastService
  ) {}

  async ngOnInit() {
    this.loginForm = this.formBuilder.group({
      terminal: new FormControl('', Validators.compose([Validators.required])),
      password: new FormControl('', Validators.compose([Validators.required])),
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
}
