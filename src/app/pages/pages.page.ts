import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../api/storage.service';
@Component({
  selector: 'app-pages',
  templateUrl: './pages.page.html',
  styleUrls: ['./pages.page.scss'],
})
export class PagesPage implements OnInit {

  constructor(
    private router: Router,
    private storage:StorageService) { }

 async ngOnInit() {
    let student=await this.storage.get('student');
    let staff=await this.storage.get('staff');
    if(student)this.router.navigate(['student']);
    if(staff)this.router.navigate(['interview']);

  }

}
