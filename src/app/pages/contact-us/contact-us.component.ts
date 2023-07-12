import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TosterService } from 'src/app/api/toster.service';
import {UserService} from '../../api/user.service';
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
})
export class ContactUsComponent  implements OnInit {
  ionicForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    last_name: new FormControl(''),
    mobile: new FormControl(''),
    email: new FormControl(''),
    country: new FormControl(''),
    visaCat: new FormControl(false),
  });
  isSubmitted = false;
  constructor( 
    private formBuilder: FormBuilder,
    private toster:TosterService,
    private service:UserService) { }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      last_name: ['', [Validators.required, Validators.minLength(2)]],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      country: ['', [Validators.required]],
      visaCat:['', [Validators.required]],
    });
  }

  get errorControl():{ [key: string]: AbstractControl }  {
    return this.ionicForm.controls;
  }

  onSubmit() {
    this.isSubmitted = true;
    if (!this.ionicForm.valid) {
      this.toster.dismissLoader();
      return false;
    } else {
      this.toster.showLoading();
      this.service.contact(this.ionicForm.value).subscribe((res:any) => {
        this.toster.dismissLoader();
        this.toster.success('form submitted successfully')
      });
    }
    return true;
  }


}
