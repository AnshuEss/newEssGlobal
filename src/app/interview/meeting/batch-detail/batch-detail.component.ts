import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../api/user.service';
import { CrmService } from 'src/app/api/crm.service';
import { AlertController  } from '@ionic/angular';
import { StorageService } from 'src/app/api/storage.service';
import { TosterService } from 'src/app/api/toster.service';
@Component({
  selector: 'app-batch-detail',
  templateUrl: './batch-detail.component.html',
  styleUrls: ['./batch-detail.component.scss'],
})
export class BatchDetailComponent implements OnInit {
  studentList: any[] = [];
  data: any[] = [];
  staff: any;
  meetingLink: any;
  batchName: any;
  fileNo: any;
  handlerMessage: string | undefined;
  sid:any;
  hidelink:boolean=false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toster: TosterService,
    private service: UserService,
    private crmService: CrmService,
    private alertController: AlertController,
    private storage:StorageService) {
   
  }


 

  async ngOnInit() {
    this.staff= await this.storage.get('staff');
    let obj = {
      user_id: this.staff?.id,
      branch_id: this.route.snapshot.params['id']
    }
     this.service.getMyBatchStudent(obj).subscribe((res: any) => {
      console.log(obj);
      if (res.status == 200) {
        this.studentList = res.data;
      }
    })
  }

  addStu() {
    if (this.fileNo) {
      this.toster.showLoading();
      this.crmService.checkFileNo({ file_no: this.fileNo }).subscribe((res: any) => {
        if (res.status == 200) {
          console.log('res--',res.data.file_no);
          let stuObj = {
            file_no: res.data.file_no,
            token: res.data.app_token,
            stu_id:res.data.sno,
            user_id: this.staff?.id,
            branch_id: this.route.snapshot.params['id'],
            name:res.data.app_name
          }
          this.service.addStudentOnMyBatch(stuObj).subscribe((res: any) => {
            console.log(res);
            this.toster.dismissLoader();
            if(res.status==200){
              this.ngOnInit();
              this.toster.success('success');
            }else if(res.status==500){
              this.toster.error('danger');
            }
          });
        } else if (res.status == 500) {
          this.toster.error(res.msg);
        }
      },(error: { message: any; })=>{
        console.log('error---',error)
        this.toster.error(error.message);
      });
    } else {
      this.toster.error('Please fill file number');
    }
  }



  chk(e:any, d:any) {
    if (e.target.ariaChecked == 'false') {
      this.data.push(d);
    } else if (e.target.ariaChecked == 'true') {
      const index: number = this.data.indexOf(d);
      if (index !== -1) {
        this.data.splice(index, 1);
      }
    }
    if(this.data.length>0){
      this.hidelink=true;
    }else {
      this.hidelink=false;
    }

    console.log(this.data.length);
  }

 

  

  // genLink() {
  //   this.meetingLink = 'https://meet.essglobal.com/' + (new Date()).getTime();
  // }


  SendLink() {
    console.log(this.data);
    if (this.batchName.mlink) {
      this.toster.showLoading();
      let obj = {
        user_id: this.staff?.id,
        branch_id:this.route.snapshot.params['id'],
        link: this.batchName.mlink,
        data: this.data,
      }
      this.service.addLink(obj).subscribe((res: any) => {
        this.toster.dismissLoader();
        this.router.navigate(['/interview/interview-link'])
      });
    } else {
      this.toster.error('Please enter meeting link');
    }
  }

  removeStu(e:any, id:any){
    console.log(id);
    this.sid=id;
    this.presentAlert();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Are you want to remove this user!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.handlerMessage = 'Alert canceled';
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.handlerMessage = 'Alert confirmed';
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    if(role=='confirm'){
      console.log("hit--function");
      this.removeBatchUser();
    }
  }


  removeBatchUser(){
    this.service.removeBatchUser({id:this.sid}).subscribe((res: any) => {
      if(res.status==200){
        this.ngOnInit();
        this.toster.success(res.msg);
      }
    });
  }



}