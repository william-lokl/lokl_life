import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
  Resolve,
} from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { AuthService } from './services/auth.service';
import { ApiService } from './services/api.service';
import { HotToastService } from '@ngneat/hot-toast';
import { PassDataService } from './services/pass-data.service';
import { LoadingService } from './services/loading.service';

@Injectable({
  providedIn: 'root',
})
export class PermissionGuard implements Resolve<any> {
  constructor(
    private router: Router,
    private authService: AuthService,
    private apiService: ApiService,
    private toastService: HotToastService,
    private passData: PassDataService,
    public loading: LoadingService
  ) {}

  async resolve(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<any> {
    /* Para certificar que el path al cual se esta accediendo el cliente tenga permiso */
    let thisUrl: any = next.url[0].path;
    localStorage.removeItem('menu');

    let value: any = await this.getMenusUser();

    if (value.message) {
      if (value.status === 202) this.showError(state, value.message);
      else if (!value.status) this.showError(state, value.message);
      else if (value.status === 404) this.showError(state, value.message);
      else if (value.data.length === 0) {
        this.showError(state, 'No se tiene informacion del usuario');
      } else {
        let prevMenu = value.data;
        prevMenu.sort((a: any, b: any) => a.MENU_ORDEN - b.MENU_ORDEN);
        this.passData.menuUser = prevMenu;

        if (thisUrl !== 'dashboard') localStorage.setItem('banner', '3');
        if (
          thisUrl !== 'dashboard' &&
          thisUrl !== 'cambiar-clave' &&
          thisUrl !== 'recarga-balance'
        ) {
          let menu = prevMenu.find((x: any) => x.MENU_PATH === thisUrl);
          if (!menu) {
            this.showError(state, 'No tiene permiso para acceder a esta ruta');
          } else {
            localStorage.setItem('menu', JSON.stringify(menu));
            return true;
          }
        }
        return null;
      }
    } else {
      this.showError(state, value);
    }
  }
  async getMenusUser() {
    const loading: any = this.loading.show(
      'Cargando información, por favor espere...'
    );

    return new Promise((resolve, reject) => {
      this.apiService.get(`/menus/getmenus`).subscribe(
        async (res: any) => {
          loading.close();
          resolve(res);
          return true;
        },
        (error: any) => {
          loading.close();
          resolve(error);
          return false;
        }
      );
    });
  }

  showError(state: any, error: any) {
    this.toastService.error(
      'No tiene permiso para acceder a esta ruta, por favor contacte al administrador'
    );
    this.authService.logout();
  }
}
