import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../api/storage.service';
import { TosterService } from '../api/toster.service';
import { UserService } from '../api/user.service';
@Component({
  selector: 'app-pages',
  templateUrl: './pages.page.html',
  styleUrls: ['./pages.page.scss'],
})
export class PagesPage implements OnInit {
  userDiv: boolean = true;
  email: any;
  constructor(
    private router: Router,
    private storage: StorageService,
    private toster: TosterService,
    private service: UserService) { }

  async ngOnInit() {
    let student = await this.storage.get('student');
    let staff = await this.storage.get('staff');
    if (student) this.router.navigate(['student']);
    if (staff) this.router.navigate(['interview']);

  }

  async ionViewWillEnter() {
    let student = await this.storage.get('student');
    let staff = await this.storage.get('staff');
    let serviceUser=await this.storage.get('serviceUser');
    if (student) this.router.navigate(['student']);
    if (staff) this.router.navigate(['interview']);
    if(serviceUser)this.userDiv=false;
  }

 


}
