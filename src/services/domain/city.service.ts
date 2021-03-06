import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../../config/api.config';
import { CityDto } from '../../models/city.dto';
import { Observable } from 'rxjs';

@Injectable()
export class CityService {
  constructor(public http: HttpClient) {
  }

  findAll(cityId: string): Observable<CityDto[]> {
    return this.http.get<CityDto[]>(`${API_CONFIG.baseURL}/states/${cityId}/cities`);
  }
}
