import { Component } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { CredentiaisDto } from '../../models/credentiais.dto';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  creds: CredentiaisDto = {
    email: 'geeddiill@gmail.com',
    password: '123'
  };

  constructor(
    private navCtrl: NavController,
    private menu: MenuController,
    private auth: AuthService,
  ) {
  }

  ionViewWillEnter() {
    this.menu.enable(false); // desativa menu deslizante ao entrar na HomePage
  }

  ionViewDidLeave() {
    this.menu.enable(true); // ativa menu deslizante ao sair da HomePage
  }

  login() {
    this.auth.authenticate(this.creds).subscribe(response => {
      console.log('response: ', response);
      this.navCtrl.navigateRoot('categories');
    }, error => {
    });
  }
}
