import { Injectable } from '@angular/core';
import { LoadingController, AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class TosterService {

  constructor(
    private loadingCtrl: LoadingController,
    private alertController: AlertController,
    private toastController: ToastController,
  ) { }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Wait...',
    });

    loading.present();
  }

  async success(msg:any) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1500,
      position:'top',
      color: 'success'
    });

    await toast.present();
  }

  async error(msg:any) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1500,
      position:'top',
      color: 'danger'
    });

    await toast.present();
  }


  async presentAlert(msg: any) {
    const alert = await this.alertController.create({
      message: msg,
      buttons: ['OK'],
    });

    await alert.present();
  }

  // Dismiss loader
  dismissLoader() {
    this.loadingCtrl.dismiss().then((response) => {
      console.log('Loader closed!', response);
    }).catch((err) => {
      console.log('Error occured : ', err);
    });
  }
}
