import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../api/chat.service';
import { Router, ActivatedRoute } from '@angular/router';
import { StorageService } from 'src/app/api/storage.service';
import { Howl, Howler } from 'howler';
import { Camera, CameraResultType } from '@capacitor/camera';
import { PhotoService } from 'src/app/api/photo.service';
@Component({
  selector: 'app-group-chat',
  templateUrl: './group-chat.component.html',
  styleUrls: ['./group-chat.component.scss'],
})
export class GroupChatComponent implements OnInit {
  messageList: any[] = [];
  newMessage = '';
  group_id: any;
  groupName: any;
  typing: boolean = false;
  TypingDiv: boolean = false;
  hours: any;
  recording = false;
  storeFileName: any[] = [];
  delMsgArr: any[] = [];
  countdelMsg: Number = 0;
  student: any;
  primaryHeader: boolean = true;
  secondryHeader: boolean = false;
  typingUserName: any;




  public actionSheetButtons = [
    {
      text: 'Delete',
      role: 'destructive',
      data: {
        action: 'delete',
      },
    },
    {
      text: 'Share',
      data: {
        action: 'share',
      },
    },
    {
      text: 'Cancel',
      role: 'cancel',
      data: {
        action: 'cancel',
      },
    },
  ];

  constructor(
    private chatService: ChatService,
    private activatedRoute: ActivatedRoute,
    private storage: StorageService,
    private photo :PhotoService
  ) { }

  async ngOnInit() {
    this.student = await this.storage.get('student');
    this.groupName = this.chatService.getData();
    console.log(this.groupName);
    this.group_id = this.activatedRoute.snapshot.paramMap.get('id');
    this.chatService
      .getGroupMessages()
      .subscribe((message: any) => {
        console.log('group-msg', message);
        if (message?.group_id == this.group_id && message?.user_id !== this.student?.file_no) {
          this.messageList.push(message);
          this.play();
        }
      });

    this.chatService.getGroupTyping().subscribe((typing: any) => {
      console.log('gtyping', typing)
      if (this.group_id == typing.group_id && typing.id !== this.student?.file_no) {
        this.TypingDiv = true;
        this.typingUserName = typing.username;
      }
    });
    this.getMyGroupMess();
  }

  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }


  sendMessage() {
    if (this.newMessage) {
      let obj = {
        user_id: this.student?.file_no,
        group_id: this.group_id,
        message: this.newMessage,
        date: this.formatDate(new Date()),
        current_time: this.DisplayCurrentTime(),
        chatType: 2,
        username: this.student?.app_name
      }
      console.log(obj);
      // this.chatService.sendMessage(obj);
      this.messageList.push(obj);
      this.newMessage = '';
      this.typing = false;
      this.onKeyUp();
      this.saveMsg(obj);
    }
    //console.log('sendmess');
  }

  saveMsg(obj: any) {
    this.chatService.saveGroupMsg(obj).subscribe((res: any) => {
      console.log(res);
    })
  }



  handleRefresh(event: any) {
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
    }, 2000);
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

  onKeyUp() {
    this.typing = true
    if (this.typing == true) {
      let obj = {
        id: this.student?.file_no,
        username: this.student?.app_name,
        group_id: this.group_id
      }
      this.chatService.groupTyping(obj);
    }

  }



  getMyGroupMess() {
    this.chatService.getMyGroupMess({ group_id: this.group_id }).subscribe((res: any) => {
      if (res.status == 200) {
        this.messageList = res?.data;
      } else if (res.status == 500) {
      }
    });
  }

  play() {
    var sound = new Howl({
      src: ['/assets/noti.wav'],
      html5: true
    });
    sound.play();
  }

  takePicture = async () => {
    const capturedPhoto = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });
    const savedImageFile = await this.photo.savePicture(capturedPhoto);
    console.log("savedImageFile",savedImageFile);
  }

}
