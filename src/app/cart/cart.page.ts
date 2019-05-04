import { Component, OnInit } from '@angular/core';
import { CartItem } from '../../models/cart-item';
import { API_CONFIG } from '../../config/api.config';
import { ProductService } from '../../services/domain/product.service';
import { CartService } from '../../services/domain/cart.service';
import { ProductDto } from '../../models/product.dto';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  items: CartItem[];

  constructor(
    private navCtrl: NavController,
    private cartService: CartService,
    private productService: ProductService,
  ) {
  }

  ngOnInit() {
    const cart = this.cartService.getCart();
    this.items = cart.items;
    this.loadImageUrls();
  }

  loadImageUrls() {
    this.items.map((item: CartItem) => {
      this.productService.getSmallImageFromBucket(item.product.id).subscribe(response => {
          item.product.imageUrl = `${ API_CONFIG.bucketBaseURL }/prod${ item.product.id }-small.jpg`;
        },
        error => {
        });
    });
  }

  removeItem(product: ProductDto) {
    this.items = this.cartService.removeProduct(product).items;
  }

  increaseQuantity(product: ProductDto) {
    this.items = this.cartService.increaseQuantityProduct(product).items;
  }

  decreaseQuantity(product: ProductDto) {
    this.items = this.cartService.decreaseQuantityProduct(product).items;
  }

  total() {
    return this.cartService.total();
  }

  goOn() {
    this.navCtrl.navigateRoot('categories');
  }

  checkout() {
    this.navCtrl.navigateForward('pick-address');
  }

}
