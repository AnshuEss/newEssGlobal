import { Component, OnInit } from '@angular/core';
import { Browser } from '@capacitor/browser';
import { UserService } from '../../api/user.service';
import { TosterService } from 'src/app/api/toster.service';
import { StorageService } from 'src/app/api/storage.service';
@Component({
  selector: 'app-metting',
  templateUrl: './metting.component.html',
  styleUrls: ['./metting.component.scss'],
})
export class MettingComponent  implements OnInit {

  student: any;
  uid: any;
  name: any;
  hours: any;
  time: any;
  lists:any[]=[];
  fno:any;
  constructor(
    private service: UserService,
    private toster:TosterService,
    private storage:StorageService
    ) { }

  async ngOnInit() {
    this.student=await this.storage.get('student');
    this.getMettinglink();
  }

  async openBrowser(item:any) {
    console.log(item);
    // await Browser.open({ url:item?.link });
    // Browser.addListener('browserFinished', () => {
    //   console.log('browser finished');
    // });
    await this.addAttendance(item);
    window.open(item?.link, '_system');
  }

  async closeBrowser() {
    await Browser.close();
  }

  async addAttendance(item:any) {
    console.log(item);
    let obj = {
      file_no: this.student?.file_no,
      name: this.student?.app_name,
      join_time: this.DisplayCurrentTime(),
      link: item?.link,
      mid:item?.id,
      branch_id:item?.branch_id
    }
    this.service.addAttendance(obj).subscribe((res: any) => {
      console.log(res);
    });
  }

  async updateAttendance(link: any) {
    let obj = {
      file_no: this.student?.file_no,
      join_time: this.DisplayCurrentTime(),
    }
    this.service.updateAttendance(obj).subscribe((res: any) => {
      console.log(res);
    });
  }

  DisplayCurrentTime() {
    var date = new Date();
    this.hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
    var am_pm = date.getHours() >= 12 ? "PM" : "AM";
    this.hours = this.hours < 10 ? "0" + this.hours : this.hours;
    var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    this.time = this.hours + ":" + minutes + ":" + seconds + " " + am_pm;
    console.log('time', this.time);
    return this.time;
  };


  getMettinglink(){
    this.service.getMymeetingLink({uid:this.student?.file_no}).subscribe((res: any) => {
      if(res.status==200){
        console.log(res);
        this.lists=res.data;
      }else{
        this.toster.presentAlert(res.msg);
      }
    });
  }


}
