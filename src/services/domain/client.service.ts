import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClientDto } from '../../models/client.dto';
import { API_CONFIG } from '../../config/api.config';
import { StorageService } from '../storage-service';

@Injectable()
export class ClientService {

  constructor(
      private http: HttpClient,
      private storage: StorageService,
  ) {
  }

  findByEmail(email: string): Observable<ClientDto> {
    const token = this.storage.getLocalUser().token;
    const authHeader = new HttpHeaders({ Authorization: 'Bearer ' + token });

    return this.http.get<ClientDto>(
        `${ API_CONFIG.baseURL }/clients/email?value=${ email }`,
        { headers: authHeader });
  }

  getImageFromBucket(id: string): Observable<any> {
    const url = `${ API_CONFIG.bucketBaseURL }/cp${ id }.jpg`;
    return this.http.get(url, { responseType: 'blob' });
  }
}
