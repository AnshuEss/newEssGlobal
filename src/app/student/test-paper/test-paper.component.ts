import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../api/user.service';
import { Router } from '@angular/router';
import { TosterService } from 'src/app/api/toster.service';
@Component({
  selector: 'app-test-paper',
  templateUrl: './test-paper.component.html',
  styleUrls: ['./test-paper.component.scss'],
})
export class TestPaperComponent implements OnInit {
  TopicList: any[] = [];
  constructor(
    private service: UserService,
    private router: Router,
    private toster: TosterService
  ) {
  }


  ngOnInit() {
  }





}