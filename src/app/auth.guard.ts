import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';
import { ApiService } from './services/api.service';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
    private apiService: ApiService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.authService.isAuth) {
      /* Para certificar que el path al cual se esta accediendo el cliente tenga permiso */
      let thisUrl = next.url[0].path;
      if (thisUrl !== 'dashboard') {
        // if (thisUrl === 'cambiar-clave') return false;
        return true;
      }
      //this.router.navigate(['/app']);
      return true;
    }
    this.router.navigate(['/'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
