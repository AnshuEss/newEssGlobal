import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../api/storage.service';
import { TosterService } from '../../api/toster.service';
import { UserService } from '../../api/user.service';

@Component({
  selector: 'app-email-login',
  templateUrl: './email-login.component.html',
  styleUrls: ['./email-login.component.scss'],
})
export class EmailLoginComponent  implements OnInit {
email:any;
  constructor( private router: Router,
    private storage: StorageService,
    private toster: TosterService,
    private service: UserService) { }

  ngOnInit() {}

  submit() {
    if (this.email) {
      this.service.loginWithEmail({ email: this.email }).subscribe((res: any) => {
         if(res.status==200){
          this.toster.success(res?.msg);
          this.storage.set("serviceUser",res?.data);
          this.router.navigate(['/']);
         }else if(res?.status==500){
          this.toster.error(res?.msg);
         }
      });
    } else {
      this.toster.error('Please enter email id');
    }
  }

}
