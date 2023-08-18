import { Component, OnInit, ViewChild } from '@angular/core';
import { StorageService } from '../api/storage.service';
import { Router } from '@angular/router';
import { UserService } from '../api/user.service';
import { TosterService } from '../api/toster.service';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { ChatService } from '../api/chat.service';


@Component({
  selector: 'app-student',
  templateUrl: './student.page.html',
  styleUrls: ['./student.page.scss'],
})
export class StudentPage implements OnInit {
  vgdiv: boolean = false;
  testdiv: boolean = true;
  studiv: boolean = true;
  noticDiv: boolean = true;
  chatDiv: boolean = true;
  student: any;
  TopicList: any[] = [];
  isModalOpen: boolean = false;
  topicId: any;
  teachId: any;
  topicName: any;
  cNoti: any = 0;
  presentingElement = null;
  notificationList: any[] = [];
  @ViewChild(IonModal) modal: IonModal | undefined;
  constructor(
    private storage: StorageService,
    private router: Router,
    private userService: UserService,
    private toster: TosterService,
    private chat: ChatService) { }

  async ngOnInit() {
    this.student = await this.storage.get('student');
    if (this.student?.main_status == 'V-G') {
      this.vgdiv = true;
      this.noticDiv = false;
      this.testdiv = false;
      this.studiv = false;
      this.chatDiv = false;
    }
    this.userService.getStuTopic({ file_no: this.student?.file_no }).subscribe((res: any) => {
      if (res.status == 200) {
        this.TopicList = res.data;
      } else if (res.status == 500) {

      }
    })
    await this.countNoti();
    await this.getTestPaperNoti();
    await this.openChat();
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  async logout() {
    await this.storage.logout();
    this.router.navigate(['']);
  }

  testpaper() {
    this.isModalOpen = true;
  }

  OpenTestPaper(item: any) {
    console.log('item', item);
    this.isModalOpen = false;
    this.topicId = item?.topic_id;
    this.teachId = item?.user_id;
    this.topicName = item?.topic
    let obj = {
      topic_id: this.topicId,
      file_no: this.student?.file_no,
    }
    this.userService.chktodayTestPaper(obj).subscribe((res: any) => {
      if (res.status == 200) {
        this.toster.error(res.msg);
      } else if (res.status == 500) {
        let obj = {
          topic_id: this.topicId,
          teacher_id: this.teachId,
          topic_name: this.topicName
        }
        this.storage.set('topicDetail', obj);
        this.router.navigate(['student/test-paper'])
      }
    });
  }

  async countNoti() {
    let obj = {
      user_id: 3,
      from_id: this.student?.file_no
    }
    this.chat.countNoti(obj).subscribe((res: any) => {
      console.log('res', res);
      this.cNoti = res?.data?.count;
      for (let i = 0; i < res?.data?.lastmsg.length; i++) {
        this.notificationList.push({
          type: res?.data?.type,
          message: res?.data?.lastmsg[i]?.message
        })
        console.log('noti', this.notificationList);
      }
    })
  }


  async getTestPaperNoti() {
    this.userService.getTestPaperNoti({ file_no: this.student?.file_no }).subscribe((res: any) => {
      if (res.status == 200) {
        console.log('getTestPaperNoti', res?.data);
      }
    });
  }

  view(item: any) {
    if (item?.type == 1) {
      this.router.navigate(['student/support'])
    }
  }

 async openChat(){
  this.chat.getMytudentList({ from_id: this.student?.file_no }).subscribe((res: any) => {
    if (res.status == 200) {
      console.log("hit--",res.myFriList.length)
        if(res.myFriList.length=='0'){
          this.chatDiv=false; 
        }
    }
  });
 }

}
