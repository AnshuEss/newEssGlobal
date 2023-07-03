import { Component, OnInit } from '@angular/core';
import { StorageService } from '../api/storage.service';
import { Router } from '@angular/router';
import { UserService } from '../api/user.service';
import { TosterService } from '../api/toster.service';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
@Component({
  selector: 'app-student',
  templateUrl: './student.page.html',
  styleUrls: ['./student.page.scss'],
})
export class StudentPage implements OnInit {
  student: any;
  TopicList:any[]=[];
  isModalOpen:boolean=false;
  topicId:any;
  teachId:any;
  topicName:any;
  constructor(
    private storage: StorageService,
    private router: Router,
    private userService:UserService,
    private toster:TosterService) { }

  async ngOnInit() {
   this.student=await this.storage.get('student');
   this.userService.getStuTopic({ file_no: this.student?.file_no }).subscribe((res: any) => {
    if (res.status == 200) {
      this.TopicList = res.data;
    }else if(res.status==500){
      
    }
  })
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  async logout(){
    await this.storage.logout();
    this.router.navigate(['']);
  }

  testpaper(){
    this.isModalOpen=true;
  }

  OpenTestPaper(item:any){
    console.log('item',item);
    this.isModalOpen=false;
    this.topicId = item?.topic_id;
    this.teachId=item?.user_id;
    this.topicName=item?.topic
    let obj={
      topic_id:this.topicId,
      file_no:this.student?.file_no,
    }
    this.userService.chktodayTestPaper(obj).subscribe((res: any) => {
      if(res.status==200){
       this.toster.error(res.msg);
      }else if(res.status==500){
        this.storage.set('topic_id',this.topicId);
        this.router.navigate(['student/test-paper'])
      }
    });
  }
}
