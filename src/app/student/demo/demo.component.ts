import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../api/user.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { TosterService } from 'src/app/api/toster.service';
import { CapacitorVideoPlayer } from 'capacitor-video-player';
import { Device } from '@capacitor/device';
import { Capacitor } from '@capacitor/core';
@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss'],
})
export class DemoComponent  implements OnInit {

  

  constructor(
    private service: UserService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private toster:TosterService
  ) {
    
  }

  async ngOnInit() {
   
  }

  setVideoPlayer = async (): Promise<any>=> {
    const platform = Capacitor.getPlatform();
    //const res: any  = await this.videoPlayer.initPlayer({mode: 'fullscreen',url: , subtitle: 'jhkjhk'})
  };

 

}

