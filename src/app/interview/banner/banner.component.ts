import { Component, OnInit } from '@angular/core';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { UserService } from '../../api/user.service';
import { ChatService } from 'src/app/api/chat.service';
import { TosterService } from 'src/app/api/toster.service';
@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
})
export class BannerComponent  implements OnInit {

  private fileOne: File | undefined;
  bannerList: any[] = [];
  status: Number | undefined;
  constructor(
    private service: UserService,
    private chat:ChatService,
    private toster:TosterService) { }


  ngOnInit() {
    this.getImg();
  }

  onFileChange(fileChangeEven:any) {
    this.fileOne = fileChangeEven.target.files[0];
    console.log(this.fileOne);
  }

  submitForm() {
    if(this.fileOne){
      this.toster.showLoading();
      let formData = new FormData();
      formData.append("photo", this.fileOne);
      this.chat.UploadBanner(formData).subscribe((res: any) => {
        if (res.status == 200) {
          this.toster.dismissLoader();
          this.toster.success(res.msg);
          this.getImg();
        }else if(res.status==500){
          this.toster.dismissLoader();
          this.toster.error(res.msg);
        }
      })
    }else{
      this.toster.error('Please Select file');
    }
  }


  getImg() {
    this.chat.getAllBannerImg().subscribe((res: any) => {
      if (res.status == 200) {
        this.bannerList = res.data;
      }
    })
  }

  ch(e:any, id:any) {
    if (e.detail.checked == false) {
      this.status = 0;
    } else if (e.detail.checked == true) {
      this.status = 1;
    }
    this.chat.activeDeactivebannerImg({ status: this.status, _id: id }).subscribe((res: any) => {
      console.log(res);
    });
  }


}
