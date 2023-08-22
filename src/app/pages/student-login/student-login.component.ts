import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/api/user.service';
import { TosterService } from 'src/app/api/toster.service';
import { CrmService } from 'src/app/api/crm.service';
import { StorageService } from 'src/app/api/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-login',
  templateUrl: './student-login.component.html',
  styleUrls: ['./student-login.component.scss'],
})
export class StudentLoginComponent  implements OnInit {
  isModalOpen = false;
  fileNo:any;
  constructor(
    private userService:UserService,
    private toster:TosterService,
    private crmService:CrmService,
    private storage:StorageService,
    private router:Router) { }

 async ngOnInit() {
    let student=await this.storage.get('student');
     if(student){
       this.router.navigate(['student']);
     }
  }

  stuLogin(){
   this.toster.showLoading();
   if(this.fileNo){
    this.crmService.studentLogin({fileNo: this.fileNo}).subscribe((res: any) => {
      this.toster.dismissLoader()
     if(res.status==200){
       this.updateToken(res?.data?.sno);
       this.storage.set('student',res?.data);
       this.router.navigate(['student']);
     }
    },(error: { message: any; })=>{
      this.toster.dismissLoader();
      console.log('error---',error);
      this.toster.error(error?.message);
    });
   }else{
    this.toster.error('Please fill file no');
   }
  }

  updateToken(id:any) {
    // let token = this.service.getData();
    // this.crmService.updateToken({ token: token,id:id }).subscribe((res: any) => {
    //   console.log(res);
    // });
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

}
