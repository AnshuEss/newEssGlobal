import { Component, OnInit } from '@angular/core';
import { UserService } from '../../api/user.service';
import { Router } from '@angular/router';
import { TosterService } from 'src/app/api/toster.service';
import { StorageService } from 'src/app/api/storage.service';
import { register } from 'swiper/element/bundle';

register();
@Component({
  selector: 'app-test-paper',
  templateUrl: './test-paper.component.html',
  styleUrls: ['./test-paper.component.scss'],
})
export class TestPaperComponent implements OnInit {
  TopicList: any[] = [];
  QuestionList:any[]= [];
  NumOfQuestion: Number = 0;
  RightAns: Number = 0;
  count: any = 0;
  countClick: any = 0;
  uid: any;
  student: any;
  name: any;
  file_no: any;
  isModalOpen = false;
  ShowQuestionDiv: boolean = true;
  ScoreCardDiv: boolean = false;
  lastSlide = 0;
  topicId: any;
  teachId:any;
  topicName:any;
  constructor(
    private service: UserService,
    private router: Router,
    private toster:TosterService,
    private storage:StorageService
  ) {
     this.updatetestPaperNoti();
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  async ngOnInit() {
   this.student=await this.storage.get('student');
   this.file_no=this.student?.file_no;
    //this.toster.showLoading();
    this.service.getStuTopic({ file_no: this.file_no }).subscribe((res: any) => {
      this.toster.dismissLoader();
      if (res.status == 200) {
        this.TopicList = res.data;
      }else if(res.status==500){
        this.toster.presentAlert(res.msg);
      }
    },(error)=>{
      //this.toster.dismissLoader();
    })
  }

  OpenTestPaper(item:any) {
    console.log('item',item);
    this.topicId = item?.topic_id;
    this.teachId=item?.user_id;
    this.topicName=item?.topic
    let obj={
      topic_id:this.topicId,
      file_no:this.file_no,
    }
    this.service.chktodayTestPaper(obj).subscribe((res: any) => {
      if(res.status==200){
       this.toster.error(res.msg);
      }else if(res.status==500){
        this.setOpen(true);
        this.getTopic(item);
      }
    });
  }


  

  chk(id:any, opt:any) {
    this.countClick++
    //console.log('countClick', this.countClick++,'Num',this.NumOfQuestion);
    this.service.getAns({ id: id, opt: opt }).subscribe((res: any) => {
      if (res.status == 200) {
        this.count++
      }
    });
   
    if (this.NumOfQuestion == this.countClick) {
      this.ShowQuestionDiv = false;
      this.ScoreCardDiv = true;
      this.RightAns = this.count;
      let obj = {
        student_id: this.uid,
        file_no: this.file_no,
        name: this.name,
        topic_id: this.topicId,
        count_qus: this.NumOfQuestion,
        count_ans: this.RightAns,
        teacher_id:this.teachId
      }
      this.service.addStudentScore(obj).subscribe((res: any) => {
        console.log(res);
      })
    }
  }

  getTopic(item:any){
  this.service.getQuesByTopicId({ topic_id: item?.topic_id }).subscribe((res: any) => {
      if (res.status == 200) {
        this.QuestionList = res.data;
        this.NumOfQuestion = this.QuestionList.length;
      }
    });
  }

  updatetestPaperNoti(){
  this.service.updatetestPaperNoti({file_no:this.file_no}).subscribe((res: any) => {
     console.log(res);
  })
}





}