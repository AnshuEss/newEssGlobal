import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../api/user.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { TosterService } from 'src/app/api/toster.service';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss'],
})
export class DemoComponent  implements OnInit {

  TopicList: any[] = [];
  QuestionList = [];
  NumOfQuestion: Number = 0;
  RightAns: Number = 0;
  count: any = 0;
  countClick: any = 0;
  uid: any;
  user: any;
  name: any;
  file_no: any;
  isModalOpen = false;
  ShowQuestionDiv: boolean = true;
  ScoreCardDiv: boolean = false;
  lastSlide = 0;
  topicId: any;
  teachId:any;
  topicName:any;
  slideOpts = {
    initialSlide: 0,
    allowSlideNext: true,
    allowSlidePrev: false,
    loop: false,
    allowTouchMove: false,
  };

  constructor(
    private service: UserService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private toster:TosterService
  ) {
    
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  ngOnInit() {
    //this.toster.showLoading();
    this.service.getStuTopic({ file_no: this.file_no }).subscribe((res: any) => {
      if (res.status == 200) {
        this.TopicList = res.data;
      }else if(res.status==500){
        this.toster.presentAlert(res.msg);
      }
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
    //this.ionSlides.slideNext(500);
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











}

