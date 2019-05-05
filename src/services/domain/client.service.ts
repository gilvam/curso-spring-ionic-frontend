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

  findById(id: number): Observable<any> {
    return this.http.get(`${ API_CONFIG.baseURL }/clients/${ id }`);
  }

  findByEmail(email: string): Observable<any> {
    return this.http.get(`${ API_CONFIG.baseURL }/clients/email?value=${ email }`);
  }

  getImageFromBucket(id: string): Observable<any> {
    const url = `${ API_CONFIG.bucketBaseURL }/cp${ id }.jpg`;
    return this.http.get(url, { responseType: 'blob' });
  }

  insert(clientDto: ClientDto) {
    return this.http.post(
      `${ API_CONFIG.baseURL }/clients`,
      clientDto,
      // {
      //   observe: 'response',
      //   responseType: 'text'
      // }
    );
  }
}
