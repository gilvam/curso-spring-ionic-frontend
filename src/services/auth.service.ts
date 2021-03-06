import { Injectable } from '@angular/core';
import { CredentiaisDto } from '../models/credentiais.dto';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../config/api.config';
import { LocalUserModel } from '../models/local-user.model';
import { StorageService } from './storage-service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CartService } from './domain/cart.service';

@Injectable()
export class AuthService {

  private jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(
    private http: HttpClient,
    private storage: StorageService,
    private cartService: CartService,
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

  refreshToken() {
    return this.http.post(`${ API_CONFIG.baseURL }/auth/refresh_token`, {},
      {
        observe: 'response', // pega header da response
        responseType: 'text' // evitar erro de parse de JSON em um corpo vazio
      }
    );
  }

  successfulLogin(authorizationValue: string) {
    const tok = authorizationValue.substring(7);
    const user: LocalUserModel = {
      token: tok,
      email: this.jwtHelper.decodeToken(tok).sub
    };

    this.storage.setLocalUser(user);
    this.cartService.createOrClearCart();
  }

  logout() {
    this.storage.setLocalUser(null);
  }
}
