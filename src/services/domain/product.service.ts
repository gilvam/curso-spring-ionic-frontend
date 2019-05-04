import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../../config/api.config';
import { Observable } from 'rxjs';
import { ProductDto } from '../../models/product.dto';


@Injectable()
export class ProductService {

  constructor(public http: HttpClient) {
  }

  findById(productId: string) {
    return this.http.get<ProductDto>(`${ API_CONFIG.baseURL }/products/${ productId }`);
  }

  findByCategory(categoryId: string) {
    return this.http.get(`${ API_CONFIG.baseURL }/products/?categories=${ categoryId }`);
  }

  getSmallImageFromBucket(id: string): Observable<any> {
    const url = `${ API_CONFIG.bucketBaseURL }/prod${ id }-small.jpg`;
    return this.http.get(url, { responseType: 'blob' });
  }
  getImageFromBucket(id: string): Observable<any> {
    const url = `${ API_CONFIG.bucketBaseURL }/prod${ id }.jpg`;
    return this.http.get(url, { responseType: 'blob' });
  }
}
