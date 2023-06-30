import { Component, OnInit } from '@angular/core';
import { StorageService } from '../api/storage.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-student',
  templateUrl: './student.page.html',
  styleUrls: ['./student.page.scss'],
})
export class StudentPage implements OnInit {
  student: any;
  constructor(
    private storage: StorageService,
    private route: Router) { }

  async ngOnInit() {

  }

}
