import { Component, OnInit } from '@angular/core';
import { StorageService } from '../api/storage.service';
import { Router } from '@angular/router';
import { UserService } from '../api/user.service';
@Component({
  selector: 'app-interview',
  templateUrl: './interview.page.html',
  styleUrls: ['./interview.page.scss'],
})
export class InterviewPage implements OnInit {
 staff:any;
  constructor(
    private storage:StorageService,
    private router:Router,
    private userService:UserService,) { }

   ngOnInit() {
    
  }

 async logout(){
    await this.storage.logout();
    this.router.navigate(['']);
  }

  async ionViewWillEnter(){
    this.staff=await this.storage.get('staff'); 
    this.userService.activeDeative({id:this.staff?.id}).subscribe((res:any)=>{
      if(res.status==200){
       this.logout();
      }
    })
  }

}
