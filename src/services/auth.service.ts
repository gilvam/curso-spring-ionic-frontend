import { Injectable } from '@angular/core';
import { CredentiaisDto } from '../models/credentiais.dto';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../config/api.config';
import { LocalUser } from '../models/local-user';
import { StorageService } from './storage-service';

@Injectable()
export class AuthService {

  constructor(
    private http: HttpClient,
    private storage: StorageService,
  ) {
  }

  authenticate(creds: CredentiaisDto) {
    return this.http.post(`${ API_CONFIG.baseURL }/login`, creds,
      {
        observe: 'response', // pega header da response
        responseType: 'text' // evitar erro de parse de JSON em um corpo vazio
      }
    );
  }

  successfulLogin(authorizationValue: string) {
    const tok = authorizationValue.substring(7);
    const user: LocalUser = { token: tok };
    this.storage.setLocalUser(user);
  }

  logout() {
    this.storage.setLocalUser(null);
  }
}
