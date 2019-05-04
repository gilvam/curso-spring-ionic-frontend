import { Component, OnInit } from '@angular/core';
import { ProductDto } from '../../models/product.dto';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/domain/product.service';
import { NavController } from '@ionic/angular';
import { API_CONFIG } from '../../config/api.config';
import { CartService } from '../../services/domain/cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {

  item: ProductDto;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private navCtrl: NavController,
    private cartService: CartService,
  ) {
  }

  ngOnInit() {
    const productId = this.activatedRoute.snapshot.paramMap.get('productId');

    this.productService.findById(productId).subscribe((response: any) => {
        this.item = response;
        this.getImageUrlIfExists();
      },
      error => {
      });
  }

  getImageUrlIfExists() {
    this.productService.getImageFromBucket(this.item.id)
      .subscribe(response => {
          this.item.imageUrl = `${ API_CONFIG.bucketBaseURL }/prod${ this.item.id }.jpg`;
        },
        error => {
        });
  }

  addToCart(product: ProductDto) {
    this.cartService.addProduct(product);
    this.navCtrl.navigateRoot('cart');
  }

}
