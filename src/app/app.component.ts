import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  appPages = [
    { title: 'Categories', url: '/categories', icon: 'stats' },
    { title: 'Profile', url: '/profile', icon: 'contact' },
    { title: 'Cart', url: '/cart', icon: 'cart' },
    { title: 'Logout', url: '/home', icon: 'log-out' },
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private auth: AuthService,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  checkLogout(page) {
    if (page.url === '/home') {
      this.auth.logout();
    }
  }
}
