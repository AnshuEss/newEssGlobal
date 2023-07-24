import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../api/chat.service';
import { CrmService } from 'src/app/api/crm.service';
import { Router } from '@angular/router';
import { TosterService } from 'src/app/api/toster.service';
import { StorageService } from 'src/app/api/storage.service';
@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss'],
})
export class ChatListComponent  implements OnInit {

  myStudentList: any = [];
  fileNo: any;
  student: any;
  constructor(
    private chatService: ChatService,
    private router: Router,
    private crmService: CrmService,
    private toster: TosterService,
    private storage:StorageService) {

  }

 async ngOnInit() {
    this.student = await this.storage.get('student');
    console.log('stu',this.student);
    this.chatService.getMytudentList({ from_id: this.student?.file_no }).subscribe((res: any) => {
      if (res.status == 200) {
        this.myStudentList = res.data;
      } else if (res.status == 500) {
      }
    });

    this.chatService.getMessages().subscribe((user: any) => {
      console.log('profile--', user);
      let obj = {
        name: user.name,
        message: user.message,
        time: user.current_time,
        user: user.user_id
      }

      if (user.chatType == 1) {
        let obj = this.myStudentList.find((item:any) => item.from_id == user.from_id);
        obj.message = user.message;
        this.myStudentList = this.myStudentList.filter((item:any) => item.from_id !== user.from_id);
        this.myStudentList.unshift(obj);
        //this.filter();
      }
      // this.myStudentList = this.myStudentList.filter(item => item.user !== user.user_id);
      // this.myStudentList.unshift(obj);
    });;
  }

  goToChat(item: any) {
    //console.log(item);
    this.chatService.setData(item?.stf_name);
    this.router.navigate(['/student/chat/' + item?.user_id])
  }

  ionViewWillEnter() {
    let data = this.chatService.getData();
    console.log('data', data);
    if (data) {
      let index = this.myStudentList.find((item:any) => item.from_id == data.stu_id);
      if (index) {
        index.unreadyMsg = 0;
        this.myStudentList[index];
      }
    }
  }


}
