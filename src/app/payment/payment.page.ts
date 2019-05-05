import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrderDto } from '../../models/order.dto';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {

  order: OrderDto;
  installments: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // número de parcelas
  formGroup: FormGroup;

  constructor(
    private navCtrl: NavController,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) {
    this.order = JSON.parse(this.activatedRoute.snapshot.queryParams.order);
    console.log('this.order: ', this.order);

    this.formGroup = this.formBuilder.group({
      numberInstallments: [1, Validators.required],
      '@type': ['paymentCreditCard', Validators.required]
    });
  }

  ngOnInit() {
  }

  nextPage() {
    this.order.payment = this.formGroup.value;
    console.log('this.order: ', this.order);
    this.navCtrl.navigateRoot(['order-confirmation'], { queryParams: { order: JSON.stringify(this.order) } });
  }

}
