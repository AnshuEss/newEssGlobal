import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/api/user.service';
import { TosterService } from 'src/app/api/toster.service';
import { CrmService } from 'src/app/api/crm.service';
import { StorageService } from 'src/app/api/storage.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-student-login',
  templateUrl: './student-login.component.html',
  styleUrls: ['./student-login.component.scss'],
})
export class StudentLoginComponent implements OnInit {
  isModalOpen = false;
  idDateModelOpen = false;
  fileNo: any;
  dob: any;
  pipe = new DatePipe('en-US');
  date: any;
  username: any;
  mobile: any;
  constructor(
    private userService: UserService,
    private toster: TosterService,
    private crmService: CrmService,
    private storage: StorageService,
    private router: Router) { }

  async ngOnInit() {
    let student = await this.storage.get('student');
    if (student) {
      this.router.navigate(['student']);
    }
  }

  stuLogin() {
    if (this.fileNo && this.dob) {
      this.toster.showLoading();
      this.crmService.studentLogin({ fileNo: this.fileNo, dob: this.dob }).subscribe((res: any) => {
        this.toster.dismissLoader();
        if (res.status == 200) {
          this.updateToken(res?.data?.sno);
          this.storage.set('student', res?.data);
          this.router.navigate(['student']);
        } else if (res.status == 500) {
          this.toster.error(res?.msg);
        }
      }, (error: { message: any; }) => {
        this.toster.dismissLoader();
        console.log('error---', error);
        this.toster.error(error?.message);
      });
    } else {
      this.toster.error('Please fill all required fields');
    }
  }

  updateToken(id: any) {
    let token = this.userService.getData();
    console.log("token",token);
    this.crmService.updateToken({ token: token, id: id }).subscribe((res: any) => {
      console.log(res);
    });
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  openDateModel(isOpen: boolean) {
    this.idDateModelOpen = isOpen;
  }


  confirm() {
    let newDate = this.pipe.transform(this.date, 'yyyy-MM-dd');
    this.dob = newDate;
    this.idDateModelOpen = false;
  }

  trouble() {
    if (this.username && this.mobile) {
      this.userService.trubleQry({ username: this.username, mobile: this.mobile }).subscribe((res: any) => {
        if (res?.status == 200) {
          this.isModalOpen=false;
          this.toster.success(res?.msg)
        } else if (res?.status == 500) {
          this.toster.error(res?.msg);
        }
      });
    } else {
      this.toster.error("Please fill all required fields")
    }
  }



}
