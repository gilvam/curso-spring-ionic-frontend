import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../../config/api.config';
import { CategoryDto } from '../../models/category.dto';
import { Observable } from 'rxjs';
import { OrderDto } from '../../models/order.dto';

@Injectable()
export class OrderService {
  constructor(
    private http: HttpClient
  ) {
  }

  insert(order: OrderDto) {
    return this.http.post(`${ API_CONFIG.baseURL }/orders`,
      order,
      { observe: 'response', responseType: 'text' });
  }
}
