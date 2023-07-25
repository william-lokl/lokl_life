import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  post(path: string, data: any) {
    return this.http
      .post<any>(`${environment.url}${path}`, data)
      .pipe(map((d) => d));
  }

  get(path: string, data?: any): any {
    console.log(data);

    return this.http
      .get<any>(`${environment.url}${path}`, data)
      .pipe(map((data) => data));
  }

  delete(path: string) {
    return this.http
      .delete<any>(`${environment.url}${path}`)
      .pipe(map((d) => d));
  }

  put(path: string, data: any) {
    return this.http
      .put<any>(`${environment.url}${path}`, data)
      .pipe(map((d) => d));
  }
}
