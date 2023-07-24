import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { IonContent } from '@ionic/angular';
import { ChatService } from '../../api/chat.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Howl, Howler } from 'howler';
import { StorageService } from 'src/app/api/storage.service';
@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss'],
})
export class ChatsComponent  implements OnInit {
  messageList: any[] = [];
  newMessage = '';
  from_id: any;
  name: any;
  staff: any;
  typing: boolean = false;
  OnlineDiv: boolean = true;
  TypingDiv: boolean = false;
  primaryHeader:boolean=true;
  secondryHeader:boolean=false;
  hours: any;
  recording = false;
  storeFileName: any[] = [];
  delMsgArr: any[] = [];
  countdelMsg: Number = 0;
  @ViewChild(IonContent, { static: false }) content: IonContent | any;
  constructor( private chatService: ChatService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private storage:StorageService) { }

   async ngOnInit() {
      this.staff = await this.storage.get('staff');
      this.from_id = this.activatedRoute.snapshot.paramMap.get('id');
      this.name = this.chatService.getData();
      let obj={
        stu_id:this.from_id,
        stf_id:this.staff?.id
      }
      this.chatService.setData(obj);
      this.chatService.getMyMsg({ user_id: '10', from_id: this.from_id }).subscribe((res: any) => {
        if (res.status == 200) {
          this.messageList = res.data;
        }
      });
  
      this.chatService
        .getMessages()
        .subscribe((message: any) => {
          console.log(message);
          if (this.staff?.id == message.from_id && this.from_id == message.user_id) {
            this.messageList.push(message);
            this.ScrollToBottom()
            this.play();
            this.TypingDiv = false;
            this.OnlineDiv = true;
          }
        });
  
      this.chatService.getTyping().subscribe((typing: any) => {
        console.log("from", this.from_id, 'user', this.staff?.id, 'typing', typing);
        if (this.from_id == typing.uid && this.staff?.id == typing.fid) {
          this.TypingDiv = true;
          this.OnlineDiv = false;
        }
      });
      this.redAllUnreadMsg();
    }
  
    sendMessage() {
      if (this.newMessage) {
        let obj = {
          user_id: this.staff?.id,
          from_id: this.from_id,
          message: this.newMessage,
          date: this.formatDate(new Date()),
          current_time: this.DisplayCurrentTime(),
          chatType: 1
          //name: this.name
        }
        console.log(obj);
        this.ScrollToBottom()
        // this.chatService.sendMessage(obj);
        this.messageList.push(obj);
        this.newMessage = '';
        this.typing = true;
        this.saveMsg(obj);
      }
      console.log('sendmess');
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
        this.chatService.typing({ uid: this.staff?._id, fid: this.from_id });
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
  
  
  
  
    takePicture = async () => {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Uri
      });
  
      // image.webPath will contain a path that can be set as an image src.
      // You can access the original file using image.path, which can be
      // passed to the Filesystem API to read the raw data of the image,
      // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
      var imageUrl = image.webPath;
      console.log('image', image);
      // Can be set to the src of an image now
      // imageElement.src = imageUrl;
    };
  
    addDelMsg(item: any) {
      console.log(item);
      if(this.staff?.id==item?.user_id){
        let obj = this.delMsgArr.find(ele => ele == item);
        console.log(obj);
        if (obj == undefined) {
          this.delMsgArr.push(item);
          this.countdelMsg = this.delMsgArr.length;
          this.primaryHeader=false;
          this.secondryHeader=true;
        } else {
          this.delMsgArr = this.delMsgArr.filter(ele => ele !== item)
          this.countdelMsg = this.delMsgArr.length;
          if (this.countdelMsg == 0) {
            this.primaryHeader=true;
            this.secondryHeader=false;
          }
        }
      }
      
      //console.log(obj);
    }
  
    DelMsg() {
      this.delMsgArr.forEach(element => {
        this.messageList = this.messageList.filter(item => item?._id !== element)
      });
  
      this.chatService.delMessage(this.delMsgArr).subscribe((res: any) => {
        if (res.status == 200) {
          this.delMsgArr = []
          this.countdelMsg = 0;
          this.primaryHeader=true;
          this.secondryHeader=false;
        }
      })
    }
  
    play() {
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
        user_id:this.staff.id,
        from_id:this.from_id
      }
      this.chatService.redAllUnreadMsg(obj).subscribe((res: any) => {
       console.log(res);
      });
    }
  
    backButton(){
      this.primaryHeader=true;
      this.secondryHeader=false;
      this.delMsgArr=[];
    }
  
    forword(){
      console.log('hit');
      this.router.navigate(['/interview/forword']);
    }
  

}
