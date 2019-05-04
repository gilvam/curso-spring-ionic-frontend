import { Component, OnInit } from '@angular/core';
import { ProductDto } from '../../models/product.dto';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {

  item: ProductDto;

  constructor() {
  }

  ngOnInit() {
    this.item = {
      id: '1',
      name: 'Mouse',
      value: 80.59,
    };
  }

}
