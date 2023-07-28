import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

import { Router } from '@angular/router';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (request.url.includes('api.lokl')) {
      let token = localStorage.getItem('token');
      if (token) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      // Realizar la lógica específica para esta solicitud
      return next.handle(request).pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.status === 401) {
            this.router.navigateByUrl('/login');
          }

          return throwError(err);
        })
      );
    }

    return next?.handle(request);
  }
}
