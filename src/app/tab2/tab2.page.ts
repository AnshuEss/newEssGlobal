import { Component,OnInit,AfterViewInit,ViewChild, ElementRef } from '@angular/core';
import { ChatService } from '../api/chat.service';
import { StorageService } from '../api/storage.service';
import { TosterService } from '../api/toster.service';
import { register } from 'swiper/element/bundle';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  imageList:any[]=[];
  privImgList:any[]=[];
  post:any;
  staff:any;
  postList:any[]=[];
  @ViewChild('swiper')
  swiperRef: ElementRef | undefined;
  constructor(
    private chat:ChatService,
    private storage:StorageService,
    private toster:TosterService) {
    }
    ngAfterViewInit(){
      register();
    }
    ngOnInit(): void {
       this.chat.getAllPosts().subscribe((res:any)=>{
          console.log(res);
          this.postList=res.data;
       })
    }
  onFileChange(fileChangeEven:any) {
    let file= fileChangeEven.target.files[0];
    this.imageList.push(file);
    const reader = new FileReader();
    reader.onload = () => {
      let img = reader.result as string;
      this.privImgList.push(img);
    }
    reader.readAsDataURL(file)
  }

  posts(){
    if(this.post && this.imageList.length>0){
      this.toster.showLoading();
      let formData = new FormData();
      formData.append('user_id', this.staff?.id);
      formData.append('posts', this.post);
      for(let i=0; i<this.imageList.length; i++){
        formData.append('image', this.imageList[i])
      }
      this.chat.posts(formData).subscribe((res:any)=>{
        this.toster.dismissLoader();
        if(res.status==200){
          this.privImgList=[];
          this.toster.success(res.msg);
        }else{
          this.toster.error(res.msg);
        }
      },(error)=>{
         this.toster.dismissLoader();
      })
    }else{
      this.toster.error('Please write some thing and select any one image');
    }
  }



  async ionViewWillEnter(){
    this.staff=await this.storage.get('staff');
    console.log('staff',this.staff);
  }




}
