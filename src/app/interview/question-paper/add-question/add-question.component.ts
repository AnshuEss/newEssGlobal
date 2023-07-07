import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from "@angular/forms";
import { UserService } from '../../../api/user.service';
import { TosterService } from 'src/app/api/toster.service';
import { StorageService } from 'src/app/api/storage.service';
@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss'],
})
export class AddQuestionComponent implements OnInit {
  ionicForm!: FormGroup;
  isSubmitted = false;
  tid: any;
  staff: any;
  constructor(
    public formBuilder: FormBuilder,
    private service: UserService,
    private toster: TosterService,
    private storage:StorageService) { }

    async ionViewWillEnter(){
      this.staff= await this.storage.get('staff');
      this.tid= await this.storage.get('topic_id');
    }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      question: ['', [Validators.required]],
      opt_a: ['', [Validators.required]],
      opt_b: ['', [Validators.required]],
      opt_c: ['', [Validators.required]],
      opt_d: ['', [Validators.required]],
      ans: ['', [Validators.required]],
      topic_id: [],
      user_id: []
    })
  }



  get errorControl(): { [key: string]: AbstractControl } {
    return this.ionicForm.controls;
  }

  onSubmit() {
    this.isSubmitted = true;
    if (!this.ionicForm.valid) {
      console.log('Please provide all the required values!')
      return false;
    } else {
      this.toster.showLoading();
      this.ionicForm.value.topic_id = this.tid;
      this.ionicForm.value.user_id = this.staff.id;
      console.log(this.ionicForm.value);
      this.service.addQuestion(this.ionicForm.value).subscribe((res: any) => {
        if (res.status == 200) {
          this.toster.success('success');
          this.isSubmitted = false;
          this.ionicForm.reset();
        } else {
          this.toster.error(res.msg);
        }
      })
      return true;
    }
  }

  OptionSelectionChanged(ev:any) {
    if (ev.detail.value == 'opt_a') {
      this.ionicForm.value.ans= this.ionicForm.value.opt_a;
    }else if(ev.detail.value == 'opt_b'){
      this.ionicForm.value.ans=this.ionicForm.value.opt_b;
    }else if(ev.detail.value == 'opt_c'){
      this.ionicForm.value.ans=this.ionicForm.value.opt_c;
    }else if(ev.detail.value == 'opt_d'){
      this.ionicForm.value.ans=this.ionicForm.value.opt_d;
    }
  }

  

}