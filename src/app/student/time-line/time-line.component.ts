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
timeLineList:any[]=[];
  constructor(
    private storage:StorageService,
    private crm:CrmService) { }

 async ngOnInit() {
  this.student=await this.storage.get('student');
  if(this.student?.main_status=='NP'){
      this.timeLineList=[
        {status:'NP',color:'green','text':'file not proceed'},
        {status:'OP',color:'red'},
        {status:'OR',color:'red'},
        {status:'FAIR',color:'red'},
        {status:'FAR',color:'red'},
        {status:'CoeP',color:'red'},
        {status:'CoeR',color:'red'},
        {status:'F@H',color:'red'},
        {status:'AIP',color:'red'},
        {status:'DRP',color:'red'},
        {status:'V-R',color:'red'},
        {status:'V-G',color:'red'},
      ]
  }else if(this.student?.main_status=='OP'){
    this.timeLineList=[
      {status:'NP',color:'green','text':'offer proceed'},
      {status:'OP',color:'green'},
      {status:'OR',color:'red'},
      {status:'FAIR',color:'red'},
      {status:'FAR',color:'red'},
      {status:'CoeP',color:'red'},
      {status:'CoeR',color:'red'},
      {status:'F@H',color:'red'},
      {status:'AIP',color:'red'},
      {status:'DRP',color:'red'},
      {status:'V-R',color:'red'},
      {status:'V-G',color:'red'},
    ]
  }else if(this.student?.main_status=='OR'){
    this.timeLineList=[
      {status:'NP',color:'green','text':'offer recieved'},
      {status:'OP',color:'green'},
      {status:'OR',color:'green'},
      {status:'FAIR',color:'red'},
      {status:'FAR',color:'red'},
      {status:'CoeP',color:'red'},
      {status:'CoeR',color:'red'},
      {status:'F@H',color:'red'},
     
    ]
  }else if(this.student?.main_status=='FAIR'){
    this.timeLineList=[
      {status:'NP',color:'green','text':'gte recived'},
      {status:'OP',color:'green'},
      {status:'OR',color:'green'},
      {status:'FAIR',color:'green'},
      {status:'FAR',color:'red'},
      {status:'CoeP',color:'red'},
      {status:'CoeR',color:'red'},
      {status:'F@H',color:'red'},
     
    ]
  }else if(this.student?.main_status=='FAR'){
    this.timeLineList=[
      {status:'NP',color:'green','text':'Confirmation recived'},
      {status:'OP',color:'green'},
      {status:'OR',color:'green'},
      {status:'FAIR',color:'green'},
      {status:'FAR',color:'green'},
      {status:'CoeP',color:'red'},
      {status:'CoeR',color:'red'},
      {status:'F@H',color:'red'},
    
    ]
  }else if(this.student?.main_status=='CoeP'){
    this.timeLineList=[
      {status:'NP',color:'green','text':'Confirmation process'},
      {status:'OP',color:'green'},
      {status:'OR',color:'green'},
      {status:'FAIR',color:'green'},
      {status:'FAR',color:'green'},
      {status:'CoeP',color:'green'},
      {status:'CoeR',color:'red'},
      {status:'F@H',color:'red'},
     
    ]
  }else if(this.student?.main_status=='CoeR'){
    this.timeLineList=[
      {status:'NP',color:'green','text':'confirmation  recievd'},
      {status:'OP',color:'green'},
      {status:'OR',color:'green'},
      {status:'FAIR',color:'green'},
      {status:'FAR',color:'green'},
      {status:'CoeP',color:'green'},
      {status:'CoeR',color:'green'},
      {status:'F@H',color:'red'},
      
    ]
  }else if(this.student?.main_status=='F@H'){
    this.timeLineList=[,
      {status:'NP',color:'green','text':'file at high commission'},
      {status:'OP',color:'green'},
      {status:'OR',color:'green'},
      {status:'FAIR',color:'green'},
      {status:'FAR',color:'green'},
      {status:'CoeP',color:'green'},
      {status:'CoeR',color:'green'},
      {status:'F@H',color:'green'},
     
    ]
  }
 }

}
