import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/api/chat.service';
import { StorageService } from 'src/app/api/storage.service';
import {Howl, Howler} from 'howler';
@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss'],
})
export class SupportComponent implements OnInit {
  message: any;
  student: any;
  hours: any;
  from_id:any=3;
  chatList:any[]=[];
  constructor(
    private chat: ChatService,
    private storage: StorageService) { }

  async ngOnInit() {
    this.student = await this.storage.get('student');
    let obj = {
      user_id: this.student?.file_no,
      from_id: 3
    }
    console.log('obj',obj);
    this.chat.getAllmySupportMsg(obj).subscribe((res: any) => {
      console.log(res);
      this.chatList=res.data;
    })

    this.chat
      .getSupportMessages()
      .subscribe((message: any) => {
        console.log('support-msg',message);
        if(this.student?.file_no==message.from_id && this.from_id==message.user_id){
          this.chatList.push(message);
          this.playringTone();
        }
        
      });

    await this.readAllMsg();
  }

  sendMsg() {
    console.log('hit', this.student);
    if (this.message) {
      let obj = {
        user_id: this.student?.file_no,
        name: this.student?.app_name,
        from_id: 3,
        message: this.message,
        date: this.formatDate(new Date()),
        current_time: this.DisplayCurrentTime(),
      }
      this.chatList.push(obj);
      this.chat.saveSupportMsg(obj).subscribe((res: any) => {
        console.log(res);
      })
      this.message='';
    }
  }

  private formatDate(date: any) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }


  DisplayCurrentTime() {
    var date = new Date();
    this.hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
    var am_pm = date.getHours() >= 12 ? "PM" : "AM";
    this.hours = this.hours < 10 ? "0" + this.hours : this.hours;
    var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    return this.hours + ":" + minutes + ":" + am_pm;
  };

 async readAllMsg(){
    let obj = {
      user_id: 3,
      from_id:this.student?.file_no
    }
    this.chat.readAllMsg(obj).subscribe((res:any)=>{
     console.log('res--',res);
    })
  }

  playringTone() {
    console.log('play-hit');
    //this.streamingMedia.playAudio('/assets/noti.wav');
    var sound = new Howl({
      src: ['/assets/noti.wav'],
      html5: true
    });

    sound.play();
  }

  

}
