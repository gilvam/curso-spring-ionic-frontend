import { Component, OnInit } from '@angular/core';
import { AddressDto } from '../../models/address.dto';
import { NavController } from '@ionic/angular';
import { ClientDto } from '../../models/client.dto';
import { StorageService } from '../../services/storage-service';
import { ClientService } from '../../services/domain/client.service';

@Component({
  selector: 'app-pick-address',
  templateUrl: './pick-address.page.html',
  styleUrls: ['./pick-address.page.scss'],
})
export class PickAddressPage implements OnInit {

  items: AddressDto[];

  constructor(
    private navCtrl: NavController,
    private storage: StorageService,
    private clientService: ClientService,
  ) { }

  ngOnInit() {
    const localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.clientService.findByEmail(localUser.email).subscribe((response: any) => {
        this.items = response.addresses;
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

}
