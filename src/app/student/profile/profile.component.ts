import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/api/storage.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent  implements OnInit {

  student:any;
  constructor(
    private router:Router,
    private storage:StorageService) { }

 async ngOnInit() {
    this.student=await this.storage.get('student');
    console.log("student",this.student);
  }

}
