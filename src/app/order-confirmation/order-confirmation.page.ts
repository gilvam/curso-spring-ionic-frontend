import { Component, OnInit } from '@angular/core';
import { OrderDto } from '../../models/order.dto';
import { CartItem } from '../../models/cart-item';
import { NavController } from '@ionic/angular';
import { CartService } from '../../services/domain/cart.service';
import { ClientDto } from '../../models/client.dto';
import { AddressDto } from '../../models/address.dto';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from '../../services/domain/client.service';
import { OrderService } from '../../services/domain/order.service';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.page.html',
  styleUrls: ['./order-confirmation.page.scss'],
})
export class OrderConfirmationPage implements OnInit {

  order: OrderDto;
  cartItems: CartItem[];
  client: ClientDto;
  address: AddressDto;
  codOrder: string;

  constructor(
    private navCtrl: NavController,
    private activatedRoute: ActivatedRoute,
    private cartService: CartService,
    private clientService: ClientService,
    private orderService: OrderService,
  ) {
    this.order = JSON.parse(this.activatedRoute.snapshot.queryParams.order);
  }

  ngOnInit() {
    this.cartItems = this.cartService.getCart().items;

    this.clientService.findById(this.order.client.id).subscribe(response => {
        this.client = response as ClientDto;
        this.address = this.findAddress(this.order.addressDelivery.id, response.addresses);
      },
      error => {
        this.navCtrl.navigateRoot('home');
      });
  }

  private findAddress(id: number, list: AddressDto[]): AddressDto {
    const position = list.findIndex(x => x.id === id);
    return list[position];
  }

  total() {
    return this.cartService.total();
  }

  checkout() {
    this.orderService.insert(this.order).subscribe(response => {
        this.cartService.createOrClearCart();
        this.codOrder = this.extractId(response.headers.get('location'));
      },
      error => {
        if (error.status === 403) {
          this.navCtrl.navigateRoot('home');
        }
      });
  }

  back() {
    this.navCtrl.navigateRoot('cart');
  }
  home() {
    this.navCtrl.navigateRoot('categories');
  }

  private extractId(location: string): string {
    const position = location.lastIndexOf('/');
    return location.substring(position + 1, location.length);
  }

}
