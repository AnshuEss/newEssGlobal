import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/api/user.service';
import { TosterService } from 'src/app/api/toster.service';
import { CrmService } from 'src/app/api/crm.service';
import { StorageService } from 'src/app/api/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-staff-login',
  templateUrl: './staff-login.component.html',
  styleUrls: ['./staff-login.component.scss'],
})
export class StaffLoginComponent  implements OnInit {

  email:any;
  password:any;
  constructor(
    private userService:UserService,
    private toster:TosterService,
    private crmService:CrmService,
    private storage:StorageService,
    private router:Router) { }

 async ngOnInit() {
    let staff=await this.storage.get('staff');
     if(staff){
       this.router.navigate(['interview']);
     }
  }


  staffLogin(){
   if(this.email && this.password){

   }else{
    this.toster.error('Please fill all fields')
   }
  }

}
