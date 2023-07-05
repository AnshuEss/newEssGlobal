import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/api/storage.service';
import { TosterService } from 'src/app/api/toster.service';
import { UserService } from 'src/app/api/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-create-metting-link',
  templateUrl: './create-metting-link.component.html',
  styleUrls: ['./create-metting-link.component.scss'],
})
export class CreateMettingLinkComponent  implements OnInit {
  branchName:any;
  staff:any;
  myBranchList:any[]=[];
  batchName:any;
  isModalOpen = false;
  bid:any;
  constructor(
    private storage:StorageService,
    private toster:TosterService,
    private userService:UserService,
    private router:Router) { }

 async ngOnInit() {
   this.staff=await this.storage.get('staff');
   this.getBranch();
 }

  createBranch() {
    if (this.branchName) {
      let obj={
        user_id:this.staff.id,
        branch_name:this.branchName,
        mlink:'https://meet.essglobal.com/' + (new Date()).getTime()
      }
      this.toster.showLoading();
      this.userService.createNewBranch(obj).subscribe((res: any) => {
       if(res.status==200){
          this.toster.dismissLoader()
          this.branchName = '';
          this.getBranch();
          this.toster.success('success');
       }
      },(error)=>{
        console.log(error);
        this.toster.dismissLoader()
      });
    } else {
      this.toster.error('Please fill all fileds');
    }
  }

  getBranch(){
    this.userService.getMycreatedBranch({user_id:this.staff.id}).subscribe((res: any) => {
      console.log(res);
      if(res.status==200){
        this.myBranchList=res.data;
      }
    })
  }

  setOpen(isOpen: boolean,item:any) {
    this.isModalOpen = isOpen;
    this.batchName=item?.branch_name;
    this.bid=item?.id;
  }

  UpdateBtch(){
    this.toster.showLoading();
    this.userService.updateBatchName({id:this.bid,batchName:this.batchName}).subscribe((res: any) => {
      console.log(res);
      if(res.status==200){
        this.toster.dismissLoader();
        this.toster.success('success');
        this.getBranch();
      }
    })
  }


  viewStudentList(item:any){
    let obj={
      bname:item?.branch_name,
      mlink:item?.metting_link
    }
    this.userService.setData(obj);
    this.router.navigate(['interview/meeting/branch-detail/'+item?.id])
  }

}
