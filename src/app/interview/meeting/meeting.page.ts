import { Component, OnInit,ViewChild  } from '@angular/core';
import { UserService } from '../../api/user.service';
import { Router } from '@angular/router';
import { Browser } from '@capacitor/browser';
import { Clipboard } from '@capacitor/clipboard';
import { CrmService } from 'src/app/api/crm.service';
import { StorageService } from 'src/app/api/storage.service';
import {AlertController  } from '@ionic/angular';
import { TosterService } from 'src/app/api/toster.service';
@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.page.html',
  styleUrls: ['./meeting.page.scss'],
})
export class MeetingPage implements OnInit {

  mettingList: any[]=[];
  isModalOpen = false;
  staff:any;
  handlerMessage = '';
  roleMessage = '';
  status:any;
  fileNo:any;
  backButton:any
  platform: any;
  constructor(
    private alertController: AlertController,
    private service:UserService,
    private router:Router,
    private crmService: CrmService,
    private storage:StorageService,
    private toster:TosterService) { }

  async ngOnInit() {
    this.staff= await this.storage.get('staff');
    this.service.getMeetingLink({user_id:this.staff?.id}).subscribe((res: any) => {
      this.mettingList=res.data;
    });
  }

  async presentAlert(link:any) {
    const alert = await this.alertController.create({
      header: 'Are you want to close this link',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.handlerMessage = 'Alert canceled';
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.handlerMessage = 'Alert confirmed';
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    this.roleMessage = `Dismissed with role: ${role}`;
    if(role=='confirm'){
      console.log('anshu',link);
      this.removelink(link);
    }
  }



  removelink(link:any){
    this.service.removelink({link:link}).subscribe((res: any) => {
     console.log(res);
     if(res.status==200){
      this.toster.success(res.message)
      this.ngOnInit();
     }
    });
  }

  async openBrowser(link:any) {
    await Browser.open({ url:link });
    Browser.addListener('browserFinished', () => {
      console.log('browser finished');
    });
    
  }



  async closeBrowser() {
    await Browser.close();
  }

  disbaleLink(e:any, link:any){
    console.log(e.detail.checked);
    if (e.detail.checked == false) {
      this.status = 0;
    } else if (e.detail.checked == true) {
      this.status = 1;
    }
    this.service.removelink({status: this.status,link:link}).subscribe((res: any) => {
      if(res.status==200){
        this.toster.success(res.msg)
        this.ngOnInit();
      }
    })
  }

  copyLink(link:any){
     Clipboard.write({
      string: link
    }).then(()=>{
      this.toster.success("Link copied");
    });
  }


}
