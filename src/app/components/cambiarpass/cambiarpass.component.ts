import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { LoadingService } from 'src/app/services/loading.service';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-cambiarpass',
  templateUrl: './cambiarpass.component.html',
  styleUrls: ['./cambiarpass.component.scss'],
})
export class CambiarpassComponent implements OnInit {
  changeForm!: UntypedFormGroup;

  changeObj: any = {
    password: '',
    newpassword: '',
    renewpassword: '',
  };

  constructor(
    public formBuilder: UntypedFormBuilder,
    private apiService: ApiService,
    public loading: LoadingService,
    private toastService: HotToastService
  ) {}

  ngOnInit(): void {
    this.changeForm = this.formBuilder.group(
      {
        password: new UntypedFormControl(
          '',
          Validators.compose([Validators.required])
        ),
        newpassword: new UntypedFormControl(
          '',
          Validators.compose([Validators.required])
        ),
        renewpassword: new UntypedFormControl(
          '',
          Validators.compose([Validators.required])
        ),
      },
      {
        validator: this.matchPwds, // custom validation
      }
    );
  }

  matchPwds(control: AbstractControl) {
    let newPwd2: any = control.get('newpassword');
    let confirmPwd2: any = control.get('renewpassword');
    if (newPwd2?.value !== confirmPwd2?.value) {
      return { pwdsDontMatch: true };
    }
    return null;
  }

  clickfunc() {
    let objCambio = {
      oldPass: this.changeObj.password,
      newPass: this.changeObj.newpassword,
      confirmPass: this.changeObj.renewpassword,
    };

    // console.log('cambiar password', objCambio);

    const loadingM: any = this.loading.show(
      'Cambiando contraseña, por favor espere...'
    );

    this.apiService.post(`/user/changepassword`, objCambio).subscribe(
      async (res: any) => {
        loadingM.close();
        if (res.status === 202) this.showError(res.message);
        else if (!res.status) this.showError(res.message);
        else if (res.status === 404) this.showError(res.message);
        else {
          this.showError('Contraseña cambiada con éxito', 'ok');
          this.changeForm.reset();
          // this.resetForm();
        }
      },
      (error: any) => {
        loadingM.close();
        console.log('error cambiando la contraseña', error);
        this.showError(error);
      }
    );
  }

  showError(error: any, option?: any) {
    if (option) this.toastService.success(error);
    else {
      this.toastService.error(
        typeof error === 'object'
          ? '¡Lo sentimos! Estamos presentando problemas. Intenta más tarde'
          : error
      );
    }
  }
}
