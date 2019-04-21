import { Injectable } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { StorageService } from '../services/storage-service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private storage: StorageService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      // tap(
      //   item => {
      //     if (item instanceof HttpResponse) {
      //       if (item.headers.get('Authorization')) {
      //         console.log('interceptor Authorization): ', item.headers.get('Authorization'));
      //       }
      //       return item;
      //     }
      //   }
      // ),
      catchError(err => {
        let e = err;
        if (e.error) { // se tem campo error (feito no back end)
          e = e.error;
        } else { // se o obj error não é json
          e = JSON.parse(e);
        }

        switch (e.status) {
          case 403:
            this.handle403();
            break;
        }


        console.log('Erro detectado pelo interceptor: ', e);
        return throwError(e); // propaga o erro filtrado ao .subscribe junto ao ErrorInterceptorProvider a baixo
      })
    );
  }

  private handle403() {
    this.storage.setLocalUser(null); // remove localUser do storage
  }
}

/**
 * Injetado no app.module podendo assim propagar o erro com filtros de acordo com o pipe usado no intercept a cima
 **/
export const ErrorInterceptorProvider = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
  },
];
