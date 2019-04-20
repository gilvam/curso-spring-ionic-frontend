import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { StorageService } from '../../services/storage-service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  email: string;

  constructor(
    private navCtrl: NavController,
    private storage: StorageService,
  ) {
  }

  ngOnInit() {
    const localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.email = localUser.email;
    }
  }

}
