import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../../config/api.config';
import { StateDto } from '../../models/state.dto';
import { Observable } from 'rxjs';

@Injectable()
export class StateService {
  constructor(public http: HttpClient) {
  }

  findAll(): Observable<StateDto[]> {
    return this.http.get<StateDto[]>(`${API_CONFIG.baseURL}/states`);
  }
}
