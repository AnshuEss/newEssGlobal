import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SupportPage } from './support.page';
import { StuMsgComponent } from './stu-msg/stu-msg.component';

const routes: Routes = [
  {
    path: '',
    component: SupportPage
  },
  {
    path: 'stu-msg',
    component: StuMsgComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SupportPageRoutingModule {}
