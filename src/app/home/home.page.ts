import { Component } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { CredentiaisDto } from '../../models/credentiais.dto';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  creds: CredentiaisDto = {
    email: '',
    password: ''
  };

  constructor(
    private navCtrl: NavController,
    public menu: MenuController,
  ) {
  }

  ionViewWillEnter() {
    this.menu.enable(false); // desativa menu deslizante ao entrar na HomePage
  }

  ionViewDidLeave() {
    this.menu.enable(true); // ativa menu deslizante ao sair da HomePage
  }

  login() {
    console.log('this.creds: ', this.creds);
    this.navCtrl.navigateRoot('categories');
  }
}
