import { Component, OnInit } from '@angular/core';
import { ProductDto } from '../../models/product.dto';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/domain/product.service';
import { NavController } from '@ionic/angular';
import { API_CONFIG } from '../../config/api.config';

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

}
