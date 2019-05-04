import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../../config/api.config';
import { Observable } from 'rxjs';


@Injectable()
export class ProductService {

  constructor(public http: HttpClient) {
  }

  findByCategory(categoryId: string) {
    return this.http.get(`${ API_CONFIG.baseURL }/products/?categories=${ categoryId }`);
  }

  getSmallImageFromBucket(id: string): Observable<any> {
    const url = `${ API_CONFIG.bucketBaseURL }/prod${ id }-small.jpg`;
    return this.http.get(url, { responseType: 'blob' });
  }
}
