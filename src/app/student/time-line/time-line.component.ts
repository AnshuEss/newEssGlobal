import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/api/storage.service';
import { CrmService } from 'src/app/api/crm.service';
@Component({
  selector: 'app-time-line',
  templateUrl: './time-line.component.html',
  styleUrls: ['./time-line.component.scss'],
})
export class TimeLineComponent  implements OnInit {
student:any
  constructor(
    private storage:StorageService,
    private crm:CrmService) { }

 async ngOnInit() {
  this.student=await this.storage.get('student');
  this.crm.timeline({file_no:this.student?.file_no}).subscribe((res:any)=>{
     if(res.status==200){

     }else{
      
     }
  })
 }

}
