import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { ICreateOrderRequest } from 'ngx-paypal';
import { ApiService } from 'src/app/services/api.service';
import { LoadingService } from 'src/app/services/loading.service';

import { environment } from 'src/environments/environment';
import * as $ from 'jquery';
import { HotToastService } from '@ngneat/hot-toast';

declare var ATHM_Checkout: any;

@Component({
  selector: 'app-recargabalance',
  templateUrl: './recargabalance.component.html',
  styleUrls: ['./recargabalance.component.scss'],
})
export class RecargabalanceComponent implements OnInit {
  public payPalConfig: any;
  public showPaypalButtons: boolean = false;

  @ViewChild('one') d1: ElementRef | any;

  recargaForm!: FormGroup;

  recarga: any = {
    ammount: '',
    number: '',
  };

  rechargeAmmount = 10;
  total = 0;
  impuesto = 0;
  porcentaje = 0.03;
  min = 100;

  constructor(
    private formBuilder: FormBuilder,
    public loading: LoadingService,
    private apiService: ApiService,
    private toastService: HotToastService
  ) {}

  ngOnInit(): void {
    this.recargaForm = this.formBuilder.group({
      ammount: new FormControl('', Validators.compose([Validators.required])),
    });
  }

  cantidadchange(event: any) {
    if (Number(event) >= Number(this.min)) {
      this.showPaypalButtons = true;
      // this.valueNow = 80;
      this.calculateTotal();
      this.athButtons();
      this.paypalButtons();
    } else {
      this.showPaypalButtons = false;
      // this.valueNow = 30;
    }
  }

  calculateTotal() {
    this.impuesto = !isNaN(this.rechargeAmmount)
      ? Number(this.rechargeAmmount) * this.porcentaje
      : 0;
    this.impuesto = Number(this.impuesto.toFixed(2));
    this.total = !isNaN(this.rechargeAmmount)
      ? Number(this.rechargeAmmount) + this.impuesto
      : 0;
    this.total = Number(this.total.toFixed(2));
    // console.log(this.total);
  }

  /// Botones

  paypalButtons() {
    this.payPalConfig = {
      currency: 'USD',
      clientId: environment.clientPaypal,
      createOrderOnClient: (data: any) =>
        <ICreateOrderRequest>{
          intent: 'CAPTURE',
          purchase_units: [
            {
              amount: {
                currency_code: 'USD',
                value: this.total.toString(),
                breakdown: {
                  item_total: {
                    currency_code: 'USD',
                    value: this.total.toString(),
                  },
                },
              },
            },
          ],
        },
      advanced: {
        commit: 'true',
      },
      style: {
        label: 'paypal',
        layout: 'vertical',
      },
      // onApprove: (data, actions) => {
      //   console.log(
      //     'onApprove - transaction was approved, but not authorized',
      //     data,
      //     actions
      //   );
      //   actions.order.get().then((details) => {
      //     console.log(
      //       'onApprove - you can get full order details inside onApprove: ',
      //       details
      //     );
      //   });
      // },
      onClientAuthorization: (data: any) => {
        // console.log(
        //   'onClientAuthorization - you should probably inform your server about completed transaction at this point',
        //   data
        // );
        this.recargarFunc(this.rechargeAmmount, 7);
      },
      onCancel: (data: any, actions: any) => {
        // console.log('OnCancel', data, actions);
        let error = 'Cancel payment';
        console.log(error);
        this.showError(error);
      },
      onError: (err: any) => {
        console.log('OnError', err);
        let error;
        if (this.rechargeAmmount > 0) error = 'Error paypal';
        else error = 'El valor a recargar debe ser mayor a 0';
        console.log(error);
        this.showError(error);
      },
      onClick: (data: any, actions: any) => {
        console.log('onClick', data, actions);
      },
    };
  }

  athButtons() {
    const component = this;
    ATHM_Checkout.env = 'sandbox';
    ATHM_Checkout.publicToken = 'sandboxtoken01875617264';
    ATHM_Checkout.total = this.total;
    ATHM_Checkout.onCompletedPayment = function (response: any) {
      console.log('completed Ath', response);
      component.recargarFunc(component.rechargeAmmount, 7);
    };

    (ATHM_Checkout.onCancelledPayment = function (response: any) {
      console.log('Cancelled Ath', response);
    }),
      $.getScript(environment.athUrl, function (data, textStatus, jqxhr) {
        console.log(data, textStatus, jqxhr.status);
      })
        .done(() => {
          this.d1.nativeElement.insertAdjacentHTML(
            'beforeend',
            '<div id="ATHMovil_Checkout_Button"></div>'
          );
          const el = document.getElementById('ATHMovil_Checkout_Button');
        })
        .fail(function (data, textStatus, jqxhr) {
          if (textStatus === 'error') {
            console.log('dismis');
          }
        });
  }

  ///FUncion de recarga exitosa

  recargarFunc(valor: any, pasarela: any) {
    let objRecarga = {
      valor,
      pasarela,
    };

    console.log('crear recarga', objRecarga);

    const loadingM: any = this.loading.show(
      'Creando recarga, por favor espere...'
    );

    this.apiService.post(`/balance/recharge-balance`, objRecarga).subscribe(
      async (res: any) => {
        console.log('Respuesta recarga: ', res);
        loadingM.close();

        if (res.status === 202) this.showError(res.message);
        else if (!res.status) this.showError(res.message);
        else if (res.status === 404) this.showError(res.message);
        else {
          // this.rechargeAmmount = this.min;
          // this.calculateTotal();
          // this.response = res;
          if (res.data[0].registra_cargarbalance == '00') {
            // await new Promise((resolve) =>
            //   setTimeout(async () => {
            //     // this.
            //   }, 1000)
            // );
            this.showError('Recarga realizada con éxito', 'ok');
          } else this.showError('La recarga no se pudo completar');
          // Obtener el nuevo saldo del usuario
          // await this.getInfoUser();
        }
      },
      (error: any) => {
        loadingM.close();
        console.log('error creando la recarga', error);
        this.showError(error);
      }
    );
  }

  // Mostrar errores
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
