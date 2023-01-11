import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingService } from 'src/app/services/loading.service';
import { PassDataService } from 'src/app/services/pass-data.service';
import { Router } from '@angular/router';

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
    public router: Router
  ) {}

  async ngOnInit() {
    localStorage.removeItem('menu');
    await this.getMenusUser();
  }

  async getMenusUser() {
    const loading: any = this.loading.show(
      'Cargando información, por favor espere...'
    );

    let promise = new Promise((resolve, reject) => {
      this.apiService.get(`/menus/getmenus`).subscribe(
        async (res: any) => {
          loading.close();
          if (res.status === 202) this.showError(res.message);
          else if (!res.status) this.showError(res.message);
          else if (res.status === 404) this.showError(res.message);
          else if (res.data.length === 0) {
            this.showError('No se tiene informacion del usuario');
          } else {
            let prevMenu = res.data;
            prevMenu.sort((a: any, b: any) => a.MENU_ORDEN - b.MENU_ORDEN);
            this.menu = prevMenu;
            // console.log(this.menu);
            resolve(res);
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

  clickMenu(menu: any) {
    localStorage.setItem('menu', JSON.stringify(menu));
    if (menu.MENU_PATH === 'recargas' || menu.MENU_PATH === 'pines')
      this.router.navigate([`/productos/${menu.MENU_TIPO_PROD}`]);
    else this.router.navigate(['/productos/1']);
    //this.router.navigate(['/recargas/1']);
  }

  showError(error: any) {
    this.toast.show(
      typeof error === 'object'
        ? '¡Lo sentimos! Estamos presentando problemas. Intenta más tarde'
        : error,
      'error'
    );
  }
}
