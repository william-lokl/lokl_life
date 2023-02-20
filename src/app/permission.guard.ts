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
@Injectable({
  providedIn: 'root',
})
export class PermissionGuard implements Resolve<any> {
  constructor(
    private router: Router,
    private authService: AuthService,
    private apiService: ApiService
  ) {}

  async resolve(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<any> {
    let value: any = await this.getMenusUser();
    if (value.message) {
      if (value.status === 202) this.showError(state, value.message);
      else if (!value.status) this.showError(state, value.message);
      else if (value.status === 404) this.showError(state, value.message);
      else if (value.data.length === 0) {
        this.showError(state, 'No se tiene informacion del usuario');
      } else {
        console.log(
          '🚀 ~ file: permission.guard.ts:28 ~ PermissionGuard ~ value',
          value
        );
      }
      return null;
    } else {
      this.showError(state, value);
    }
  }

  async getMenusUser() {
    return new Promise((resolve, reject) => {
      this.apiService.get(`/menus/getmenus`).subscribe(
        async (res: any) => {
          resolve(res);
          return true;
        },
        (error: any) => {
          resolve(error);
          return false;
        }
      );
    });
  }

  showError(state: any, error: any) {
    this.router.navigate(['/'], { queryParams: { returnUrl: state.url } });
    console.log(error);
  }
}
