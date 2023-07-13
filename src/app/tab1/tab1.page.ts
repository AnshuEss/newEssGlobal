import { Component,OnInit } from '@angular/core';
import {ElementRef, ViewChild } from '@angular/core';
import { UserService } from '../api/user.service';
import { ChatService } from '../api/chat.service';
import { StorageService } from '../api/storage.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  @ViewChild('swiper')
  swiperRef: ElementRef | undefined;
  bannerimgList:any[]=[];
  staff:any;
  constructor(
    private userService:UserService,
    private chatservice:ChatService,
    private storage:StorageService,
    private router:Router) {}
 
  ngOnInit(): void {
    this.chatservice.getActiveBannerImg().subscribe((res:any)=>{
      console.log(res);
      this.bannerimgList=res.data;
    })
  }


}
