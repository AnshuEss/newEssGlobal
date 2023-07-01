import { Component, OnInit } from '@angular/core';
import { StorageService } from '../api/storage.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-interview',
  templateUrl: './interview.page.html',
  styleUrls: ['./interview.page.scss'],
})
export class InterviewPage implements OnInit {

  constructor(
    private storage:StorageService,
    private router:Router) { }

  ngOnInit() {
  }

 async logout(){
    await this.storage.logout();
    this.router.navigate(['']);
  }

}
