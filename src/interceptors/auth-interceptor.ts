import { Injectable } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { StorageService } from '../services/storage-service';
import { API_CONFIG } from '../config/api.config';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(public storage: StorageService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const localUser = this.storage.getLocalUser();
    const N = API_CONFIG.baseURL.length;
    const requestToAPI = request.url.substring(0, N) === API_CONFIG.baseURL;

    // se existe token && request é feita para a api
    if (localUser && requestToAPI) { // se existe token
      const authRq = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + localUser.token) });
      return next.handle(authRq);
    } else { // se nao existe token
      return next.handle(request);
    }
  }
}

/**
 * Injetado no app.module podendo assim propagar o erro com filtros de acordo com o pipe usado no intercept a cima
 **/
export const AuthInterceptorProvider = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  },
];
