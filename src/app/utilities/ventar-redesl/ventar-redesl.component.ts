import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { LoadingService } from 'src/app/services/loading.service';
import { PassDataService } from 'src/app/services/pass-data.service';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-ventar-redesl',
  templateUrl: './ventar-redesl.component.html',
  styleUrls: ['./ventar-redesl.component.scss'],
})
export class VentarRedeslComponent implements OnInit {
  @Input() tipo: Number = 1;

  constructor(
    private apiService: ApiService,
    public passData: PassDataService,
    public loading: LoadingService,
    private toastService: HotToastService
  ) {}

  ngOnInit(): void {
    if (this.tipo === 1) {
      this.createLink();
    }
  }

  createLink() {
    let objLink = {
      type: this.tipo,
      valor: this.tipo === 1 ? '' : '',
      endDate: this.tipo === 1 ? [] : [],
    };

    const loadingM: any = this.loading.show(
      'Creando link, por favor espere...'
    );

    this.apiService.post(`/productos/crealink`, objLink).subscribe(
      async (res: any) => {
        loadingM.close();
        if (res.status === 202) this.showError(res.message);
        else if (!res.status) this.showError(res.message);
        else if (res.status === 404) this.showError(res.message);
        else {
          // console.log('link creado', res);
          window.location.href = window.location.href = '/#/dashboard';
          window.open(
            `https://pay.pagatodopr.com/${res.data.linkId}`,
            '_blank'
          );
        }
      },
      (error: any) => {
        loadingM.close();
        console.log('error creando el link', error);
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
