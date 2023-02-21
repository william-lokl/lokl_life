import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingService } from 'src/app/services/loading.service';
import { PassDataService } from 'src/app/services/pass-data.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import { HotToastService } from '@ngneat/hot-toast';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  menu: any = [];

  constructor(
    private apiService: ApiService,
    public passData: PassDataService,
    public toast: ToastrService,
    public loading: LoadingService,
    public router: Router,
    public sanitizer: DomSanitizer,
    private toastService: HotToastService
  ) {}

  async ngOnInit() {
    this.menu = this.passData.menuUser;
    await this.getBanners();
  }

  clickMenu(menu: any) {
    if (menu.MENU_TIPO_PROD === 20 || menu.MENU_TIPO_PROD === 21) return false;
    else {
      return this.router.navigate([`/${menu.MENU_PATH}`]);
    }
  }

  async getBanners() {
    let promise = new Promise((resolve, reject) => {
      this.apiService
        .get(`/menus/getbanner/${localStorage.getItem('banner')}`)
        .subscribe(
          async (res: any) => {
            if (res.status === 202) this.showError(res.message);
            else if (!res.status) this.showError(res.message);
            else if (res.status === 404) this.showError(res.message);
            else if (res.data.length === 0) {
              this.showError('No se tiene informacion de los banner');
            } else {
              Swal.fire({
                html: `
                      <div">
                          <form class="mt-1.5 space-y-6" >
                            <div class="relative">
                              <img src= ${res.data[0].BANNER_64}></img>
                            </div>
                          </form>
                      </div>
                `,
                confirmButtonText: 'Cerrar',
                focusConfirm: false,
                showCloseButton: true,
                showLoaderOnConfirm: true,
                width: '800px',
                preConfirm: async () => {
                  return true;
                },
                allowOutsideClick: () => !Swal.isLoading(),
              }).then((result: any) => {
                localStorage.setItem('banner', '3');
              });
            }
          },
          (error: any) => {
            console.log('Error consultando informacion', error);
            this.showError(error);
            reject(error);
          }
        );
    });
    return promise;
  }

  showError(error: any) {
    this.toastService.error(
      typeof error === 'object'
        ? '¡Lo sentimos! Estamos presentando problemas. Intenta más tarde'
        : error
    );
  }
}
