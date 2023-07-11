import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/api/storage.service';
import { ChatService } from 'src/app/api/chat.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-support',
  templateUrl: './support.page.html',
  styleUrls: ['./support.page.scss'],
})
export class SupportPage implements OnInit {
  staff:any;
  userList:any[]=[];
  constructor(
    private storage:StorageService,
    private chat:ChatService,
    private router:Router
    ) { }

  async ngOnInit() {
    this.staff=await this.storage.get('staff');
    this.chat.getAllSupportMsg().subscribe((res:any)=>{
      this.userList=res?.data;
    })
  }

  sendMsg(item:any){
    let obj={
      name:item?.name,
      file_no:item?.user_id
    }
    this.storage.set('stu_detail',obj);
    this.router.navigate(['interview/support/stu-msg']);
  }



}
