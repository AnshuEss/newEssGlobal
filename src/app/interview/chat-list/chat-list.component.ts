import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../api/chat.service';
import { CrmService } from 'src/app/api/crm.service';
import { Router } from '@angular/router';
import { TosterService } from 'src/app/api/toster.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { StorageService } from 'src/app/api/storage.service';
@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss'],
})
export class ChatListComponent implements OnInit {

  myStudentList: any = [];
  myfriList: any = [];
  fileNo: any;
  users: any;
  groupName: any;
  showcreateGroupDiv: boolean = false;
  hidecreateGroupDiv: boolean = true;
  showcNextDiv: boolean = false;
  groupArr: any = [];
  title = 'Create new group';
  groupId: any;
  subscription: Subscription | undefined
  constructor(
    private chatService: ChatService,
    private router: Router,
    private crmService: CrmService,
    private toster: TosterService,
    private storage: StorageService) { }


  async ngOnInit() {
    this.users = await this.storage.get('staff');
    this.chatService.getMytudentList({ user_id: this.users?.id }).subscribe((res: any) => {
      if (res.status == 200) {
        this.myStudentList = res.data;
        this.myfriList = res.myFriList;
        this.getMyGroup();
      } else if (res.status == 500) {

      }
    });
    this.subscription = this.chatService.getNotifyOnchatList().subscribe((user: any) => {
      if (user.chatType == 1) {
        let obj = this.myStudentList.find((item: any) => item.from_id == user.user_id);
        obj.message = user.message;
        this.myStudentList = this.myStudentList.filter((item: any) => item.from_id !== user.user_id);
        this.myStudentList.unshift(obj);
        this.filter();
      }
    });

  }


  addStu() {
    if (this.fileNo) {
      this.toster.showLoading();
      this.crmService.checkFileNo({ file_no: this.fileNo }).subscribe((res: any) => {
        if (res.status == 200) {
          //console.log('res--', res.data.file_no);
          let stuObj = {
            from_id: res.data.file_no,
            stu_name: res.data.app_name,
            stf_name: this.users.name,
            user_id: this.users.id,
            sname: res.data.app_name //student name
          }
          this.chatService.addStudentOnMyChatList(stuObj).subscribe((res: any) => {
            // console.log(res);
            this.toster.dismissLoader()
            if (res.status == 200) {
              this.ngOnInit();
              this.toster.success(res.msg);
            } else if (res.status == 500) {
              this.toster.error(res.msg);
            }
          });
        } else if (res.status == 500) {
          this.toster.error(res.msg);
        }
      }, (error) => {
        console.log('error---', error)
        this.toster.error(error);
      });
    } else {
      this.toster.error('Please fill file number');
    }
  }

  goToChat(item: any) {
    //console.log(item);
    if (item.type == 2) {
      this.chatService.setData(item?.group_name);
      this.router.navigate(['/interview/group-chat/' + item?.id]);
    } else if (item.type == 1) {
      this.chatService.setData(item?.stu_name);
      this.router.navigate(['/interview/chat/' + item?.from_id])
    }
  }

  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }


  count = 0
  filter() {
    console.log('hit', this.count++);
    //let index = this.myStudentList.indexOf(obj);
    // this.myStudentList.fill(obj.message=user.message,obj.time=user.current_time, index, index++);
  }

  getMyGroup() {
    this.chatService.getMyGroup({ user_id: this.users.id }).subscribe((res: any) => {
      if (res.status == 200) {
        let data = res?.data;
        for (let i = 0; i < data.length; i++) {
             this.myStudentList.push({
              group_name:data[i].group_name,
              type:data[i].type,
              user_id:data[i].user_id,
              id:data[i]._id
             })
        }
        console.log('this.myStudentList', this.myStudentList);
      } else if (res.status == 500) {
      }
    });
  }

  chk(ev: any, item: any) {
    // console.log('item', item);
    if (ev.detail.checked == true) {
      this.groupArr.push({
        group_id: this.groupId,
        user_id: item?.from_id,
        name: item?.stu_name,
        date: this.formatDate(new Date())
      });
    } else if (ev.detail.checked == false) {
      this.groupArr = this.groupArr.filter((item: any) => item.id !== item?._id);
    }
    if (this.groupArr.length > 0) {
      this.showcreateGroupDiv = true;
      this.showcNextDiv = true;
    } else {
      this.showcNextDiv = false;
    }
  }

  next() {
    this.isModalOpen = false;
    if (this.groupName) {
      this.chatService.creteGb({ user_id: this.users.id, name: this.groupName }).subscribe((res: any) => {
        if (res.status == 200) {
          this.groupArr.map((ele:any)=> ele.group_id=res?.data?._id);
          this.chatService.addStudentOnGroup(this.groupArr).subscribe((res: any) => {
            if (res.status == 200) {
              let obj = {
                id: this.groupName,
                name: this.groupName
              }
              this.chatService.setData(obj);
              this.router.navigate(['/interview/group-chat']);
            } else if (res.status == 500) {
            }
          });
          this.isModalOpen = false;
        }
      })
    } else {
      this.toster.error('Please enter group name');
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

  ionViewWillEnter() {
    let data = this.chatService.getData();
    //console.log('data',data);
    if (data) {
      let index = this.myStudentList.find((item: any) => item.user_id == data.stf_id);
      index.unreadyMsg = 0;
      this.myStudentList[index];
    }
  }

}
