import { Component, OnInit,ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { IonContent } from '@ionic/angular';
import { ChatService } from '../../api/chat.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TosterService } from 'src/app/api/toster.service';
import { Howl, Howler } from 'howler';
import { StorageService } from 'src/app/api/storage.service';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent  implements OnInit {

  @ViewChild(IonContent, { static: false }) content: IonContent | any;
  messageList: any[] = [];
  newMessage = '';
  from_id: any;
  name: any;
  student: any;
  typing: boolean = false;
  OnlineDiv: boolean = true;
  TypingDiv: boolean = false;
  hours: any;
  showDelDiv:boolean=false;
  delMsgArr: any[] = [];
  countdelMsg:Number=0;
  constructor(
    private chatService: ChatService,
    private router:Router,
    private toster:TosterService,
    private activatedRoute: ActivatedRoute,
    private storage:StorageService
  ) { }

 async ngOnInit() {
    this.student =await this.storage.get('student');
    this.from_id = this.activatedRoute.snapshot.paramMap.get('id');
    this.name = this.chatService.getData();
    let obj={
      stu_id:this.student?.file_no,
      stf_id:this.from_id
    }
    this.chatService.setData(obj);
    this.chatService.getMyMsg({user_id:this.student?.file_no,from_id:this.from_id}).subscribe((res: any) => {
      if (res.status == 200) {
          this.messageList = res.data;
      }
    }); 

    this.chatService
      .getMessages()
      .subscribe((message: any) => {
        console.log('stu-hit',message);
        if(this.from_id==message.user_id && this.student?.file_no==message.from_id){
          this.messageList.push(message);
          this.play();
          this.TypingDiv = false;
          this.OnlineDiv = true;
        }
        
      });

     

      this.redAllUnreadMsg();
  }

  sendMessage() {
    if (this.newMessage) {
      let obj = {
        user_id: this.student?.file_no,
        from_id: this.from_id,
        message: this.newMessage,
        date: this.formatDate(new Date()),
        current_time: this.DisplayCurrentTime(),
        name: this.student?.app_name,
        chatType:1
      }
      console.log('obj',obj);
      //this.chatService.sendMessage(obj);
      this.messageList.push(obj);
      this.newMessage = '';
      this.typing = true;
      this.saveMsg(obj);
    }
  }

  saveMsg(obj: any) {
    this.chatService.saveMsg(obj).subscribe((res: any) => {
      console.log(res);
    })
  }

  handleRefresh(event:any) {
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
    }, 2000);
  }


  onKeyUp(ev:any) {
    this.typing = true
    if (this.typing == true) {
      //console.log('user',this.users?.file_no,'from',this.from_id);
      this.chatService.typing({uid:this.student?.file_no,fid:this.from_id});
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

  addDelMsg(id: any) {
    let obj = this.delMsgArr.find(item => item == id);
    console.log(obj);
    if (obj == undefined) {
      this.delMsgArr.push(id);
      this.countdelMsg = this.delMsgArr.length;
      this.showDelDiv=true;
    } else {
      this.delMsgArr = this.delMsgArr.filter(item => item !== id)
      this.countdelMsg = this.delMsgArr.length;
      if(this.countdelMsg==0){
        this.showDelDiv=false;
      }
    }

  }

  DelMsg() {
    this.delMsgArr.forEach(element => {
      this.messageList = this.messageList.filter(item => item?._id !== element)
    });

    this.chatService.delMessage(this.delMsgArr).subscribe((res: any) => {
      if (res.status == 200) {
        this.delMsgArr = []
        this.countdelMsg = 0;
        this.showDelDiv=false;
      }
    })
  }

  play() {
    console.log('stu plau');
    //this.streamingMedia.playAudio('/assets/noti.wav');
    var sound = new Howl({
      src: ['/assets/noti.wav'],
      html5: true
    });

    sound.play();
  }

  ScrollToBottom() {
    this.content.scrollToBottom(1500);
  }

  redAllUnreadMsg(){
    let obj={
      user_id:this.student.file_no,
      from_id:this.from_id
    }
    this.chatService.redAllUnreadMsg(obj).subscribe((res: any) => {
     console.log(res);
    });
  }

}
