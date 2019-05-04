import { Component, OnInit } from '@angular/core';
import { ProductDto } from '../../models/product.dto';
import { NavController, NavParams, Platform } from '@ionic/angular';
import { ActivatedRoute, ParamMap, Params, Route, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ProductService } from '../../services/domain/product.service';
import { API_CONFIG } from '../../config/api.config';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  items: ProductDto[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private navCtrl: NavController,
  ) {
  }

  ngOnInit(): void {

    const categoryId = this.activatedRoute.snapshot.paramMap.get('categoryId');

    this.productService.findByCategory(categoryId).subscribe((response: any) => {
        this.items = response.content;
        this.loadImageUrls();
      },
      error => {
      });
  }

  loadImageUrls() {
    this.items.map((item: ProductDto) => {
      this.productService.getSmallImageFromBucket(item.id).subscribe(response => {
          item.imageUrl = `${ API_CONFIG.bucketBaseURL }/prod${ item.id }-small.jpg`;
        },
        error => {
        });
    });
  }

  showDetail() {
    this.navCtrl.navigateForward('product-detail');
  }
}
