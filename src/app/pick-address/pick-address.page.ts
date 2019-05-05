import { Component, OnInit } from '@angular/core';
import { AddressDto } from '../../models/address.dto';
import { NavController } from '@ionic/angular';
import { StorageService } from '../../services/storage-service';
import { ClientService } from '../../services/domain/client.service';
import { OrderDto } from '../../models/order.dto';
import { CartService } from '../../services/domain/cart.service';
import { ItemOrderDto } from '../../models/item-order.dto';
import { Cart } from '../../models/cart';
import { CartItem } from '../../models/cart-item';

@Component({
  selector: 'app-pick-address',
  templateUrl: './pick-address.page.html',
  styleUrls: ['./pick-address.page.scss'],
})
export class PickAddressPage implements OnInit {

  items: AddressDto[];
  order: OrderDto;

  constructor(
    private navCtrl: NavController,
    private storage: StorageService,
    private clientService: ClientService,
    private cartService: CartService,
  ) {
  }

  ngOnInit() {
    const localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.clientService.findByEmail(localUser.email).subscribe((response: any) => {
        console.log('response: ', response);
        this.items = response.addresses;

        const cart: Cart = this.cartService.getCart();
        console.log('cart: ', cart);

        this.order = {
          client: { id: response.id },
          addressDelivery: null,
          payment: null,
          items: cart.items.map((item: CartItem) => { return { amount: item.amount, product: { id: item.product.id } }; })
        };

        console.log('this.order: ', this.order);

        // buscar imagem
      }, error => {
        if (error.status === 403) {
          this.navCtrl.navigateRoot('home');
        }
      });
    } else {
      this.navCtrl.navigateRoot('home');
    }
  }

  nextPage(item: AddressDto) {
    this.order.addressDelivery = { id: item.id };
    console.log('nextPage -> this.order: ', this.order);
  }

}
