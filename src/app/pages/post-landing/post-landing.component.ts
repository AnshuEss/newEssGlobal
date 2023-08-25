import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CrmService } from 'src/app/api/crm.service';
import { Router } from '@angular/router';
import { TosterService } from 'src/app/api/toster.service';
import { StorageService } from 'src/app/api/storage.service';

@Component({
  selector: 'app-post-landing',
  templateUrl: './post-landing.component.html',
  styleUrls: ['./post-landing.component.scss'],
})
export class PostLandingComponent implements OnInit {

  ionicForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    services: new FormControl(''),
    remarks: new FormControl(''),
    email: new FormControl(''),
    mobile_vg: new FormControl(''),
    mobile: new FormControl(''),
    user_id: new FormControl(false),
  });
  isSubmitted = false;
  users: any;
  showForm: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private service: CrmService,
    private toster: TosterService,
    private router: Router,
    private storage: StorageService) {

  }

  async ngOnInit() {
    this.users = await this.storage.get('serviceUser');
    if (this.users) this.showForm=true;

    this.ionicForm = this.formBuilder.group({
      username: [this.users?.username, Validators.required],
      services: [''],
      remarks: ['', Validators.required], //address
      email: [this.users?.email, [Validators.required, Validators.email]],
      file_no: [this.users?.file_no], //address
      mobile: [this.users?.mobile, Validators.required], //address
      user_id: [this.users?.id]
    });
    let ser=await this.storage.get('service');
    if(ser){
      this.ionicForm.patchValue({
        services: ser,
      })
    }

  }

  get errorControl(): { [key: string]: AbstractControl } {
    return this.ionicForm.controls;
  }




  onSubmit() {
    this.isSubmitted = true;
    if (!this.ionicForm.valid) {
      return false;
    } else {
      // this.toster.showLoading();
      console.log("form", this.ionicForm.value.services);
      if (this.ionicForm.value.services == '') {
        this.toster.error('Please select any one service');
        return false;
      }
      this.service.addServices(this.ionicForm.value).subscribe((res: any) => {
        if (res.status == 200) {
          this.toster.success(res.msg);
          this.onReset();
          this.toster.dismissLoader();
          //this.router.navigate(['/']);
        } else {
          this.toster.dismissLoader();
          this.toster.error(res.msg);
        }
      })
      return true;
    }
  }

  onReset(): void {
    this.isSubmitted = false;
    this.ionicForm.reset();
  }

  async clickSer(ser: any) {
    let user = await this.storage.get('serviceUser');
    if (user) {
      this.ionicForm.patchValue({
        services: ser,
      })
    } else {
      this.storage.set("service", ser);
      this.router.navigate(['pages/registration']);
    }

  }

  async ionViewWillEnter() {
    this.users = await this.storage.get('serviceUser');
    if (this.users) this.showForm=true;
    this.ngOnInit();
  }

}
