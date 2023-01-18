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

  options: any;
  constructor(
    public router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
    this.options = this.toastr.toastrConfig;
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      terminal: new FormControl('', Validators.compose([Validators.required])),
      password: new FormControl('', Validators.compose([Validators.required])),
    });
  }

  clickfunc() {
    let objLogin: any = {
      dispositivo: this.login.terminal,
      clave: this.login.password,
    };

    this.authService.login(objLogin).subscribe(
      (res: any) => {
        //this.loading.dismiss();
        if (res.status) {
          window.location.href = window.location.href = '/#/dashboard';
          //console.log('login');
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
          this.toastr.show(log, 'error');
          console.log(log);
        }
      },
      (error: any) => {
        this.toastr.show('Su email ó contraseña son inválidos', 'error');
        console.log('error en el login', error);
      }
    );
  }
}
