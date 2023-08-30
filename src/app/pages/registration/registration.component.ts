import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/api/user.service';
import { Router } from '@angular/router';
import { TosterService } from 'src/app/api/toster.service';
import { StorageService } from 'src/app/api/storage.service';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent  implements OnInit {
  ionicForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    mobile: new FormControl(''),
    password: new FormControl(''),
    app_token:new FormControl('')
  });
  isSubmitted = false;
  appToken:any;
  constructor(private formBuilder: FormBuilder,
    private service: UserService,
    private toster: TosterService,
    private router: Router,
    private storage: StorageService) { }

  async ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      username:['',Validators.required],
      email: ['', [Validators.required,Validators.email]],
      mobile: ['', [Validators.required]],
      password: ['',[Validators.required]], //address
      app_token:['']
    });
    this.appToken=await this.storage.get("token");
    console.log("registration form token--",this.appToken);
  }

  get errorControl(): { [key: string]: AbstractControl } {
    return this.ionicForm.controls;
  }


  onSubmit() {
    this.isSubmitted = true;
    if (!this.ionicForm.valid) {
      return false;
    } else {
      this.toster.showLoading();
      this.ionicForm.value.app_token=this.appToken;
      console.log("form",this.ionicForm.value);
      this.service.registration(this.ionicForm.value).subscribe((res: any) => {
        this.toster.dismissLoader();
        if (res.status == 200) {
          this.toster.success(res.msg);
          this.onReset();
          this.toster.dismissLoader();
          this.storage.set("serviceUser",res?.data);
          this.router.navigate(['/pages/post-landing']);
        } else {
          this.toster.dismissLoader();
          this.toster.error(res.msg);
        }
      })
    }
    return;
  }

  onReset(): void {
    this.isSubmitted = false;
    this.ionicForm.reset();
  }

}
