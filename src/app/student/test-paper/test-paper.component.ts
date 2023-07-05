import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { UserService } from '../../api/user.service';
import { Router } from '@angular/router';
import { TosterService } from 'src/app/api/toster.service';
import { Swiper } from 'swiper';
import { register } from 'swiper/element/bundle';
import { StorageService } from 'src/app/api/storage.service';
register();
@Component({
  selector: 'app-test-paper',
  templateUrl: './test-paper.component.html',
  styleUrls: ['./test-paper.component.scss'],
})
export class TestPaperComponent implements OnInit {
  TopicList: any[] = [];
  @ViewChild('swiper')
  swiperRef: ElementRef | undefined;
  swiper?: Swiper;
  isModalOpen=false;
  QuestionList:any[]=[];
  NumOfQuestion:any;
  l=2;
  countClick: any = 1;
  RightAns: any = 0;
  scoreCard:boolean=false;
  showQuestionCountDiv:boolean=true;
  student:any;
  topicDetail:any;
  topicName:any;
  constructor(
    private service: UserService,
    private router: Router,
    private toster: TosterService,
    private storage:StorageService
  ) {
    this.isModalOpen=false;
  }


  async ngOnInit() {
   this.student=await this.storage.get('student');
   this.topicDetail=await this.storage.get('topicDetail');
   console.log('topicDetail--',this.topicDetail);
   this.topicName=this.topicDetail?.topic_name;
    this.service.getQuesByTopicId({ topic_id: this.topicDetail?.topic_id}).subscribe((res: any) => {
      if (res.status == 200) {
        this.QuestionList = res.data;
        this.NumOfQuestion = this.QuestionList.length;
      }
    });
  }

  swiperSlideChanged(e: any) {
   
  }
 
  swiperReady() {
    this.swiper = this.swiperRef?.nativeElement.swiper;
  }

  chk(id:any, opt:any,ans:any) {
    console.log('id',id,'opt',opt,'ans',ans);
    if(opt==ans){
      this.RightAns++;
    }
     setTimeout(() => {
      this.l=this.countClick++;
    }, 1000);
    if(this.NumOfQuestion==this.countClick){
        setTimeout(() => {
          this.showQuestionCountDiv=false;
          this.scoreCard=true;
          let obj = {
            student_id: this.student?.sno,
            file_no: this.student?.file_no,
            name: this.student.app_name,
            topic_id: this.topicDetail?.topic_id,
            count_qus: this.NumOfQuestion,
            count_ans: this.RightAns,
            teacher_id:this.topicDetail?.teacher_id
          }
          // this.service.addStudentScore(obj).subscribe((res: any) => {
          //   console.log(res);
          // })
        }, 1000);
    } 
  }







}