import { Injectable } from '@angular/core';
import { CredentiaisDto } from '../models/credentiais.dto';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../config/api.config';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) {
  }

  authenticate(creds: CredentiaisDto) {
    return this.http.post(`${ API_CONFIG.baseURL }/login`, creds,
      {
        observe: 'response', // pega header da response
        responseType: 'text' // evitar erro de parse de JSON em um corpo vazio
      }
    );
  }
}
