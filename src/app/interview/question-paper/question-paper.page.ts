import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/api/user.service';
import { CrmService } from 'src/app/api/crm.service';
import { Router } from '@angular/router';
import { TosterService } from 'src/app/api/toster.service';
import { StorageService } from 'src/app/api/storage.service';
@Component({
  selector: 'app-question-paper',
  templateUrl: './question-paper.page.html',
  styleUrls: ['./question-paper.page.scss'],
})
export class QuestionPaperPage implements OnInit {

  topic: any;
  topicList: any[] = [];
  status: any;
  staff: any;
  constructor( 
    private toster: TosterService,
    private service: UserService,
    private router: Router,
    private crm:CrmService,
    private storage:StorageService) { }

  async ngOnInit() {
    this.staff= await this.storage.get('staff');
    this.service.getTopicList({user_id:this.staff.id,role:this.staff.role}).subscribe((res: any) => {
      if (res.status == 200) {
        this.topicList = res?.data;
      }
    },(error)=>{
      console.log(error);
    })
  }

  Create() {
    if (this.topic) {
      this.service.createTopic({user_id:this.staff.id,topic: this.topic }).subscribe((res: any) => {
        if (res.status == 200) {
          this.toster.success('success');
          this.ngOnInit();
        }
      });
    } else {
      this.toster.error('Please fill topic filed');
    }
  }

  AddQus(id: any) {
    this.service.setData(id);
    localStorage.setItem('topic_id', id);
    this.router.navigate(['interview/test/add-question']);
  }

  AddStu(id: any) {
    this.service.setData(id);
    localStorage.setItem('topic_id', id);
    this.router.navigate(['interview/test/add-student']);
  }

  ViewQusList(id: any) {
    this.service.setData(id);
    localStorage.setItem('topic_id', id);
    this.router.navigate(['interview/test/question-list']);
  }

  releaseTopic(ev:any, id:any) {
    //console.log('ev',ev.detail.checked,'id',id);
    if (ev.detail.checked == true) {
      this.status = 1;
    } else if (ev.detail.checked == false) {
      this.status = 0;
    }
    this.service.releaseTopic({ id: id, status: this.status }).subscribe((res: any) => {
      if (res.status == 200) {
         this.toster.presentAlert(res.msg);
         if(this.status==1){
           this.sendPushNotiFication(res.data);
         }
      }
    });
  }

  sendPushNotiFication(data:any){
    // this.crm.sendPush(data).subscribe((res: any) => {
      
    // });
  }


}
