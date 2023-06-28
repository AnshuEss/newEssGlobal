import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentPage } from './student.page';

import { TimeLineComponent } from './time-line/time-line.component';

const routes: Routes = [
  {
    path: '',
    component: StudentPage
  },
  {
    path: 'time-line',
    component: TimeLineComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentPageRoutingModule {}
