import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OrderConfirmationPage } from './order-confirmation.page';
import { OrderService } from '../../services/domain/order.service';

const routes: Routes = [
  {
    path: '',
    component: OrderConfirmationPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [OrderConfirmationPage],
  providers: [
    OrderService,
  ]
})
export class OrderConfirmationPageModule {
}
