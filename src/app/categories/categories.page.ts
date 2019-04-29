import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CategoryService } from '../../services/domain/category.service';
import { CategoryDto } from '../../models/category.dto';
import { API_CONFIG } from '../../config/api.config';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {

  bucketURL = API_CONFIG.bucketBaseURL;
  items: CategoryDto[];

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private categoryService: CategoryService,
  ) {
  }

  ngOnInit() {
    this.categoryService.findAll().subscribe(response => {
      this.items = response;
    }, error => {
      // console.log('error: ', error);
    });
  }

  showProducts(categoryId) {
    this.navCtrl.navigateForward(`products/${ categoryId }`);
  }
}
