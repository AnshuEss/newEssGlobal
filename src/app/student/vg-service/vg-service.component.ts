import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CrmService } from 'src/app/api/crm.service';
import { Router } from '@angular/router';
import { TosterService } from 'src/app/api/toster.service';
import { StorageService } from 'src/app/api/storage.service';
@Component({
  selector: 'app-vg-service',
  templateUrl: './vg-service.component.html',
  styleUrls: ['./vg-service.component.scss'],
})
export class VgServiceComponent implements OnInit {
  ionicForm: FormGroup = new FormGroup({
    services: new FormControl(''),
    remarks: new FormControl(''),
    email: new FormControl(''),
    mobile_vg: new FormControl(''),
    mobile: new FormControl(''),
    user_id: new FormControl(false),
  });
  isSubmitted = false;
  student: any;
  constructor(
    private formBuilder: FormBuilder,
    private service: CrmService,
    private toster: TosterService,
    private router: Router,
    private storage: StorageService) {

  }

  async ngOnInit() {
    this.student = await this.storage.get('student');


    this.ionicForm = this.formBuilder.group({
      services: [''],
      remarks: ['', Validators.required], //address
      email: [this.student?.email, Validators.required], //address
      file_no: [this.student?.file_no], //address
      mobile: [this.student?.phone_one, Validators.required], //address
      user_id: [this.student?.sno]
    });
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
      this.service.addServices(this.ionicForm.value).subscribe((res: any) => {
        if (res.status == 200) {
          this.toster.success(res.msg);
          this.isSubmitted = false;
          this.toster.dismissLoader();
          this.router.navigate(['/student']);
        } else {
          this.toster.dismissLoader();
          this.toster.error(res.msg);
        }
      })
      return true;
    }
  }

  clickSer(ser: any) {
    this.ionicForm.patchValue({
      services: ser,
    })
  }

}