import { Component, OnInit } from '@angular/core';
import { AddressDto } from '../../models/address.dto';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-pick-address',
  templateUrl: './pick-address.page.html',
  styleUrls: ['./pick-address.page.scss'],
})
export class PickAddressPage implements OnInit {

  items: AddressDto[];

  constructor(
    private navCtrl: NavController,
  ) { }

  ngOnInit() {
    this.items = [
      {
        id: 1,
        name: 'Rua Quinze de Novembro',
        number: 300,
        complement: 'Apto 200',
        district: 'Santa Mônica',
        zipCode: '48293822',
        city: {
          id: 1,
          name: 'Uberlândia',
          state: {
            id: 1,
            name: 'Minas Gerais'
          }
        }
      },
      {
        id: 2,
        name: 'Rua Alexandre Toledo da Silva',
        number: 405,
        complement: null,
        district: 'Centro',
        zipCode: '88933822',
        city: {
          id: 3,
          name: 'São Paulo',
          state: {
            id: 2,
            name: 'São Paulo'
          }
        }
      }
    ];
  }

}
