import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { register } from 'swiper/element/bundle';
import { NotificationsService } from './api/notifications.service';
import { Network, ConnectionStatus } from '@capacitor/network';
import { TosterService } from './api/toster.service';
register();
@Component({ 
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private storage: Storage,
    private toster:TosterService,
    public NotificationsService:NotificationsService) {
    this.NotificationsService.initPush();
    this.initializeApp();
  }

  async ngOnInit() {
    // If using a custom driver:
    // await this.storage.defineDriver(MyCustomDriver)
    await this.storage.create();
  }

  initializeApp() {
    Network.addListener('networkStatusChange', status => {
      console.log('Network status changed', status);
      if(status.connected==false){
        this.toster.error('Please check your internet connection');
      }
    });
  }
}
