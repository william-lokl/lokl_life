import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { PassDataService } from 'src/app/services/pass-data.service';
import { HotToastService } from '@ngneat/hot-toast';
import { createPopper } from '@popperjs/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  dropdownPopoverShow = false;
  @ViewChild('btnDropdownRef', { static: false }) btnDropdownRef: any;
  @ViewChild('popoverDropdownRef', { static: false })
  popoverDropdownRef: any;

  infoUser: any = [];
  showMenu = false;
  open = false;
  menu_name: any = undefined;

  ngAfterViewInit() {
    createPopper(
      this.btnDropdownRef.nativeElement,
      this.popoverDropdownRef.nativeElement,
      {
        placement: 'bottom-start',
      }
    );
  }

  constructor(
    private authService: AuthService,
    private apiService: ApiService,
    public passData: PassDataService,
    private toastService: HotToastService
  ) {}

  async ngOnInit() {
    const menu_selected = JSON.parse(localStorage.getItem('menu') || '{}');
    this.menu_name = menu_selected.MENU_DESCRIPCION;
    /* if (!this.passData.infoClient) {
      await this.getInfoUser();
      console.log(this.passData.infoClient);
    } */
    //await this.getInfoUser();
  }

  toggleNavbar() {
    this.showMenu = !this.showMenu;
  }

  toggleDropdown(event: any) {
    event.preventDefault();
    if (this.dropdownPopoverShow) {
      this.dropdownPopoverShow = false;
    } else {
      this.dropdownPopoverShow = true;
    }
  }

  async getInfoUser() {
    let promise = new Promise((resolve, reject) => {
      this.apiService.get(`/user/info-user`).subscribe(
        async (res: any) => {
          if (res.status === 202) this.showError(res.message);
          else if (!res.status) this.showError(res.message);
          else if (res.status === 404) this.showError(res.message);
          else if (res.data.length === 0) {
            this.showError('No se tiene informacion del usurio');
          } else {
            // this.loading.dismiss();
            this.infoUser = res.data[0];
            this.infoUser.nombre =
              this.infoUser.comenombre[0].toUpperCase() +
              this.infoUser.comenombre.slice(1).toLowerCase();

            let currentDate = new Date();
            let saldo = this.infoUser.comesaldo.split('.');
            this.infoUser.pesos = saldo[0];
            this.infoUser.centavos = saldo[1];
            this.infoUser.date = currentDate;

            this.passData.infoClient = this.infoUser;
            resolve(this.infoUser);
            // this.showError('No se tiene informacion del usurio', 'ok');
          }
        },
        (error: any) => {
          // this.loading.dismiss();
          console.log('Error consultando informacion', error);
          this.showError(error);
          reject(error);
        }
      );
    });
    return promise;
  }

  showError(error: any, option?: any) {
    // this.toast.show(
    //   typeof error === 'object'
    //     ? '¡Lo sentimos! Estamos presentando problemas. Intenta más tarde'
    //     : error,
    //   option ? 'ok' : 'error'
    // );

    if (option) this.toastService.success(error);
    else {
      this.toastService.error(
        typeof error === 'object'
          ? '¡Lo sentimos! Estamos presentando problemas. Intenta más tarde'
          : error
      );
    }
  }

  logOut() {
    this.authService.logout();
  }
}
