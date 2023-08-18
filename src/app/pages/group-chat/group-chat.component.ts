import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../api/chat.service';
import { Router, ActivatedRoute } from '@angular/router';
import { StorageService } from 'src/app/api/storage.service';
@Component({
  selector: 'app-group-chat',
  templateUrl: './group-chat.component.html',
  styleUrls: ['./group-chat.component.scss'],
})
export class GroupChatComponent  implements OnInit {
  messageList: any[] = [];
  newMessage = '';
  group_id: any;
  groupName: any;
  typing: boolean = false;
  TypingDiv: boolean = false;
  hours: any;
  recording = false;
  storeFileName:any[]=[];
  delMsgArr:any[]=[];
  countdelMsg:Number=0;
  users:any;
  username:any;
  primaryHeader:boolean=true;
  secondryHeader:boolean=false;
  constructor(  
    private chatService: ChatService,
    private activatedRoute: ActivatedRoute,
    private storage: StorageService,
    ) { }

  async ngOnInit() {
      let stu =await this.storage.get('student'); 
      let staff=await this.storage.get('staff'); 
      if(stu){
        this.username=stu;
      }
      if(staff){
        this.username=staff;
      }
      this.groupName = this.chatService.getData();
      console.log(this.groupName);
      this.group_id = this.activatedRoute.snapshot.paramMap.get('id');
      this.chatService
      .getGroupMessages()
      .subscribe((message: any) => {
        console.log('group-msg',message);
        if(message.group_id==this.group_id && message){
          this.messageList.push(message);
        }
      });
    }
  
    isModalOpen = false;
  
    setOpen(isOpen: boolean) {
      this.isModalOpen = isOpen;
    }
  

 sendMessage() {
  if (this.newMessage) {
    let obj = {
      user_id: this.username?.file_no ? this.username?.file_no : this.username?.id,
      group_id: this.group_id,
      message: this.newMessage,
      date: this.formatDate(new Date()),
      current_time: this.DisplayCurrentTime(),
      chatType:2,
      username:this.username?.app_name ?this.username?.app_name:this.username?.name
    }
    console.log(obj);
    this.chatService.sendGroupMessage(obj);
    this.messageList.push(obj);
    this.newMessage = '';
   // this.typing = true;
    this.saveMsg(obj);
  }
  //console.log('sendmess');
}

saveMsg(obj: any) {
  this.chatService.saveGroupMsg(obj).subscribe((res: any) => {
    console.log(res);
  })
}



handleRefresh(event:any) {
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

onKeyUp(ev:any) {
  this.typing = true
  // if (this.typing == true) {
  //   this.chatService.typing({ uid: this.users?._id, fid: this.from_id });
  // }
}

getMyGroupMess() {
  this.chatService.getMyGroupMess({ group_id: this.group_id }).subscribe((res: any) => {
    if (res.status == 200) {
      this.messageList = res?.data;
    } else if (res.status == 500) {
    }
  });
}



}
