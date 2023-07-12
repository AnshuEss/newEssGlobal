import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../api/user.service';
import { Router } from '@angular/router';
import { Browser } from '@capacitor/browser';
import { TosterService } from 'src/app/api/toster.service';
import { StorageService } from 'src/app/api/storage.service';
@Component({
  selector: 'app-student-score',
  templateUrl: './student-score.component.html',
  styleUrls: ['./student-score.component.scss'],
})
export class StudentScoreComponent  implements OnInit {

  ansList:any[]=[];
  scoreList:any[]=[];
  staff:any;
  isModalOpen = false;
   constructor( 
     private service: UserService,
     private router: Router,
     private toster: TosterService,
     private storage:StorageService) { }
 
  async ngOnInit() {
     this.staff=await this.storage.get('staff');
     if(this.staff?.role=='admin'){
       this.service.getStudentScore().subscribe((res: any) => {
        if (res.status == 200) {
            this.ansList = res.data;
          }
       })
     }else{
       this.service.getStudentScoreByTeacherId({user_id:this.staff?.id,date:this.formatDate(new Date())}).subscribe((res: any) => {
           this.ansList = res.data;
        }); 
     }
   }
 
  
 
   setOpen(isOpen: boolean) {
     this.isModalOpen = isOpen;
   }
 
   viewMore(item:any){
     console.log(item);
     this.isModalOpen=true;
     this.service.getStudentScoreById({id:item?.student_id}).subscribe((res: any) => {
       console.log('res',res);
       this.scoreList=res.data;
     }); 
   }
 
   async download(){
     await Browser.open({ url:'https://one96opportunities.com/essApp/excel.php?tid='+this.staff?.id});
     Browser.addListener('browserFinished', () => {
       console.log('browser finished');
     });
   }
 
   changeDate(ev:any){
     console.log(this.formatDate(ev.detail.value));
     this.toster.showLoading();
     this.service.getStudentScoreByTeacherId({user_id:this.staff?.id,date: this.formatDate(ev.detail.value)}).subscribe((res: any) => {
      this.toster.dismissLoader();
      if(res.status==200){
       this.ansList = res.data;
      }else{
       this.toster.presentAlert(res.msg);
      }
     },(error)=>{
      this.toster.dismissLoader();
     });
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
}
