import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MeetingPage } from './meeting.page';
import { CreateMettingLinkComponent } from './create-metting-link/create-metting-link.component';
import { BatchDetailComponent } from './batch-detail/batch-detail.component';
const routes: Routes = [
  {
    path: '',
    component: MeetingPage
  },
  {
    path: 'create-new-link',
    component: CreateMettingLinkComponent
  },
  {
    path: 'branch-detail/:id',
    component: BatchDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MeetingPageRoutingModule {}
