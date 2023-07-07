import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentPage } from './student.page';

import { TimeLineComponent } from './time-line/time-line.component';

import { ProfileComponent } from './profile/profile.component';

import { TestPaperComponent } from './test-paper/test-paper.component';

import { MettingComponent } from './metting/metting.component';
import { DemoComponent } from './demo/demo.component';
import { SupportComponent } from './support/support.component';

const routes: Routes = [
  {
    path: '',
    component: StudentPage
  },
  {
    path: 'time-line',
    component: TimeLineComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'test-paper',
    component: TestPaperComponent
  },
  {
    path: 'metting',
    component: MettingComponent
  },
  {
    path:'demo',
    component:DemoComponent
  },
  {
    path:'support',
    component:SupportComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentPageRoutingModule {}
