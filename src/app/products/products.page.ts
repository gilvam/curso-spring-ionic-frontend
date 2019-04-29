import { Component, OnInit } from '@angular/core';
import { ProductDto } from '../../models/product.dto';
import { NavController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  items: ProductDto[];

  constructor(
    public navCtrl: NavController
  ) {
  }

  ngOnInit(): void {
    this.items = [
      {
        id: '1',
        name: 'Mouse',
        value: 80.99
      },
      {
        id: '2',
        name: 'Teclado',
        value: 100.00
      }
    ];
  }
}
