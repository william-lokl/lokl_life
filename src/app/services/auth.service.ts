import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Login } from '../models/login';
import { LoginResponse } from '../models/login-response';
import { User } from '../models/users';
import { PassDataService } from './pass-data.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private currentLoginSubject: BehaviorSubject<LoginResponse>;
  public currentLogin: Observable<LoginResponse>;
  public auth = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    public passData: PassDataService
  ) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.currentUserSubject = new BehaviorSubject<User>(
      currentUser ? currentUser : '{}'
    );
    this.currentUser = this.currentUserSubject.asObservable();
    const token = JSON.parse(localStorage.getItem('token') || '{}');
    this.currentLoginSubject = new BehaviorSubject<LoginResponse>(
      token ? token : '{}'
    );
    this.currentLogin = this.currentLoginSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public set currentUserValue(user: User) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  public get currentLoginValue(): LoginResponse {
    return this.currentLoginSubject.value;
  }

  public get isAuth(): boolean {
    let localToken: any = localStorage.getItem('token');
    const token = JSON.parse(localToken || null);
    this.currentLoginSubject = new BehaviorSubject<LoginResponse>(
      token ? token : null
    );
    // console.log(this.currentLoginSubject.value);
    return this.currentLoginSubject.value !== null;
  }

  // register(User: User) {
  //   return this.http
  //     .post<any>(`${environment.url}admin/auth/signup`, User)
  //     .pipe(map((d) => d));
  // }

  login(login: Login) {
    return this.http
      .post<LoginResponse>(`${environment.url}/user/login`, login)
      .pipe(
        map(
          (d) => {
            if (d.status) {
              this.auth = true;
              localStorage.setItem('token', JSON.stringify(d.data.token));
              this.currentLoginSubject.next(d);
            }
            return d;
          },
          (error: any) => {
            console.log('error al realizar el login', error);
            return false;
          }
        )
      );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    localStorage.removeItem('menu');
    localStorage.removeItem('banner');
    this.currentUserSubject.next(new User());
    this.currentLoginSubject.next(new LoginResponse());
    this.passData.recargaSelected = this.passData.itemSelected = {};
    this.router.navigate(['/']);
  }
}
