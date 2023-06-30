import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.page.html',
  styleUrls: ['./pages.page.scss'],
})
export class PagesPage implements OnInit {

  isAlertOpen = false;
  public alertButtons = ['OK'];
  constructor() { }

  ngOnInit() {
    this.setOpen(true);
  }
  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }
}
