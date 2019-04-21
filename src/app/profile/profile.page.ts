import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { StorageService } from '../../services/storage-service';
import { ClientService } from '../../services/domain/client.service';
import { ClientDto } from '../../models/client.dto';
import { API_CONFIG } from '../../config/api.config';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  client: ClientDto;

  constructor(
    private navCtrl: NavController,
    private storage: StorageService,
    private clientService: ClientService,
  ) {
  }

  ngOnInit() {
    const localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.clientService.findByEmail(localUser.email).subscribe(response => {
        this.client = response;
        this.getImageIfExists();
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

  getImageIfExists() {
    this.clientService.getImageFromBucket(this.client.id)
      .subscribe(response => {
          this.client.imageUrl = `${ API_CONFIG.bucketBaseURL }/cp${ this.client.id }.jpg`;
        },
        error => {
        });
  }

}
