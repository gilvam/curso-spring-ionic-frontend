import { Injectable } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { StorageService } from '../services/storage-service';
import { AlertController } from '@ionic/angular';
import { FieldMessage } from '../models/field-message';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private storage: StorageService,
    private alertCtrl: AlertController,
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(err => {
        let e = err;
        if (e.error) { // se tem campo error (feito no back end)
          e = e.error;
        } else { // se o obj error não é json
          e = JSON.parse(e);
        }

        switch (err.status) {
          case 401: // authentication
            this.handle401();
            break;
          case 403: // Forbidden | Access Denied
            this.handle403();
            break;
          case 422:
            this.handle422(e)
            break;
          default:
            this.handleDefaultError(e);
        }

        console.log('Erro detectado pelo interceptor: ', e);
        return throwError(e); // propaga o erro filtrado ao .subscribe junto ao ErrorInterceptorProvider a baixo
      })
    );
  }

  private async handle401() {
    const alert = await this.alertCtrl.create({
      header: 'Erro 401: falha de autenticação',
      message: 'Email ou senha incorretos',
      buttons: ['OK']
    });
    await alert.present();
  }

  private handle403() {
    this.storage.setLocalUser(null); // remove localUser do storage
  }

  private async handle422(error) {
    const alert = await this.alertCtrl.create({
      header: 'Erro 422: Validação',
      message: this.listErrors(error.errors),
      buttons: ['OK']
    });
    await alert.present();
  }

  private async handleDefaultError(error) {
    const alert = await this.alertCtrl.create({
      header: `Erro ${ error.status }: ${ error.error }`,
      message: error.message,
      buttons: ['OK']
    });
    await alert.present();
  }

  private listErrors(messages: FieldMessage[]): string {
    let s = '';
    messages.map(msg => {
      s = s + '<p><strong>' + msg.fieldName + ': ' + '</strong>' + msg.message + '</p>';
    });
    return s;
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
