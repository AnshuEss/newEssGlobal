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
  topicId:any;
  isModalOpen=false;
  QuestionList:any[]=[];
  NumOfQuestion:any;
  l=1;
  countClick: any = 0;
  RightAns: Number = 0;
  constructor(
    private service: UserService,
    private router: Router,
    private toster: TosterService,
    private storage:StorageService
  ) {
    this.isModalOpen=false;
  }


   ngOnInit() {
   
    this.service.getQuesByTopicId({ topic_id: 6}).subscribe((res: any) => {
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

  chk(id:any, opt:any) {
     setTimeout(() => {
      this.l=this.countClick++;
    }, 1000); 
  }







}