import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../../config/api.config';


@Injectable()
export class ProductService {

  constructor(public http: HttpClient) {
  }

  findByCategory(categoryId: string) {
    return this.http.get(`${ API_CONFIG.baseURL }/products/?categories=${ categoryId }`);
  }
}
