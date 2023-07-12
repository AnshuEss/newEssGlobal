import { Component, OnInit } from '@angular/core';
import { UserService } from '../../api/user.service';
import { Router } from '@angular/router';
import { TosterService } from 'src/app/api/toster.service';
import { Browser } from '@capacitor/browser';
import { Storage } from '@ionic/storage-angular';
@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss'],
})
export class AttendanceComponent  implements OnInit {
  attendanceList: any[] = [];
  staff: any;
  constructor(
    private service: UserService,
    private router: Router,
    private toster: TosterService,
    private storage:Storage
  ) { }

  async ngOnInit() {
    this.staff=await this.storage.get('staff');
    if (this.staff.role == 'admin') {
      this.service.getAttendanceList().subscribe((res: any) => {
        console.log(res);
        if (res.status == 200) {
          this.attendanceList = res.data;
        }
      })
    }else{
      this.service.getAttendanceListByDate({user_id:this.staff?.id,date: this.formatDate(new Date()) }).subscribe((res: any) => {
        this.attendanceList = res.data;
      }); 
    }
  }

  changeDate(ev:any) {
    this.toster.showLoading();
    if(this.staff?.role=='admin'){
      this.service.getAttendanceListByDate({date: this.formatDate(ev.detail.value) }).subscribe((res: any) => {
        this.attendanceList = res.data;
      });
    }else{
      this.service.getAttendanceListByDate({user_id:this.staff?.id,date: this.formatDate(ev.detail.value) }).subscribe((res: any) => {
        this.attendanceList = res.data;
      });
    }

  }

  private formatDate(date: any) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }



  async export(){
    await Browser.open({ url:'https://one96opportunities.com/essApp/excel.php?uid='+this.staff?.id});
    Browser.addListener('browserFinished', () => {
      console.log('browser finished');
    });
  }


}
