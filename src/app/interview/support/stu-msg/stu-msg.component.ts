import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/api/storage.service';
import { ChatService } from 'src/app/api/chat.service';
// import {Howl, Howler} from 'howler';
@Component({
  selector: 'app-stu-msg',
  templateUrl: './stu-msg.component.html',
  styleUrls: ['./stu-msg.component.scss'],
})
export class StuMsgComponent  implements OnInit {
  message:any;
  student:any;
  hours:any;
  chatList:any[]=[];
  from_id=3;
  constructor(
    private storage:StorageService,
    private chat:ChatService) { }

 async ngOnInit() {
   this.student=await this.storage.get('stu_detail');
   let obj = {
    user_id: 3,
    from_id: this.student?.file_no
  }
  this.chat.getAllmySupportMsg(obj).subscribe((res: any) => {
    console.log(res);
    this.chatList=res.data;
  })
  this.chat
      .getSupportMessages()
      .subscribe((message: any) => {
        console.log('support-msg',message);
        if(this.student?.file_no==message.user_id && this.from_id==message.from_id){
          this.chatList.push(message);
          // this.playringTone();
        }
      });
 }

  sendMsg(){
    if (this.message) {
      let obj = {
        user_id: 3,
        name: this.student?.name,
        from_id: this.student?.file_no,
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


// playringTone() {
//     //console.log('plau');
//     //this.streamingMedia.playAudio('/assets/noti.wav');
//     var sound = new Howl({
//       src: ['/assets/noti.wav'],
//       html5: true
//     });

//     sound.play();
//   }

}
