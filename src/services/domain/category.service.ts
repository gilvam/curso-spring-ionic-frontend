import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../../config/api.config';
import { CategoryDto } from '../../models/category.dto';
import { Observable } from 'rxjs';

@Injectable()
export class CategoryService {
  constructor(public http: HttpClient) {

  }

  findAll(): Observable<CategoryDto[]> {
    return this.http.get<CategoryDto[]>(`${API_CONFIG.baseURL}/categories`);
  }
}
