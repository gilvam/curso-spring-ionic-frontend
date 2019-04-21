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

  /**
   * Antes de qualquer ação na página,
   * Atualiza o token antigo por um novo token válido
   * essa ação é realizada se o token antigo estiver no localStorage e adicionado no header usando o auth-interceptor.ts
   */
  ionViewDidEnter() {
    this.auth.refreshToken().subscribe(response => {
      this.auth.successfulLogin(response.headers.get('Authorization')); // seta NOVO token refresh no localStorage
      this.navCtrl.navigateRoot('categories');
    }, error => {
    });
  }

  login() {
    this.auth.authenticate(this.creds).subscribe(response => {
      this.auth.successfulLogin(response.headers.get('Authorization')); // seta token no localStorage
      this.navCtrl.navigateRoot('categories');
    }, error => {
    });
  }
}
