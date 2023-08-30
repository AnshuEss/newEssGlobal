import { Injectable } from '@angular/core';
import { ActionPerformed, PushNotificationSchema, PushNotifications, Token } from '@capacitor/push-notifications';
import { Capacitor } from '@capacitor/core';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { StorageService } from './storage.service';
@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(
    private service: UserService,
    private router: Router,
    private storage:StorageService) { }

  initPush() {
    if (Capacitor.getPlatform() !== 'web') {
      this.registerPush();
    }
  }
  private registerPush() {
    PushNotifications.requestPermissions().then((permission:any) => {
      if (permission.receive === 'granted') {
        PushNotifications.register();
      }
      else {
        // If permission is not granted
      }
    });
    PushNotifications.addListener('registration',
      (token: Token) => {
        this.service.setData(token.value);
        this.storage.set("token",token.value);
        console.log('Push registration success, token: ' + token.value);
      }
    );

    // Some issue with our setup and push will not work
    PushNotifications.addListener('registrationError',
      (error: any) => {
        console.log('Error on registration: ' + JSON.stringify(error));
      }
    );

    PushNotifications.addListener('pushNotificationReceived',
     async (notification: PushNotificationSchema) => {
        console.log('Push received: ' + JSON.stringify(notification));
      }
    );

    PushNotifications.addListener('pushNotificationActionPerformed',
    async (notification: ActionPerformed) => {
        console.log('Push action performed: ' + JSON.stringify(notification));
        //const data = notification.notification.data;
        this.router.navigateByUrl('/profile/notice');
      }
    );

  }
}