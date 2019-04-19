import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CategoryService } from '../../services/domain/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {

  constructor(
    private navCtrl: NavController,
    private categoryService: CategoryService,
  ) {
  }

  ngOnInit() {
    this.categoryService.findAll().subscribe(response => {
        console.log('response: ', response);
      },
      error => {
        console.log('error: ', error);
      });
  }

}
