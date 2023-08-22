import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentPage } from './student.page';

import { TimeLineComponent } from './time-line/time-line.component';

import { ProfileComponent } from './profile/profile.component';

import { TestPaperComponent } from './test-paper/test-paper.component';

import { MettingComponent } from './metting/metting.component';
import { DemoComponent } from './demo/demo.component';
import { SupportComponent } from './support/support.component';
import { VgServiceComponent } from './vg-service/vg-service.component';
import { ChatComponent } from './chat/chat.component';
import { ChatListComponent } from './chat-list/chat-list.component';
import { GroupChatComponent } from './group-chat/group-chat.component';
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
  },
  {
    path:'chat-list',
    component:ChatListComponent
  },
  {
    path:'chat/:id',
    component:ChatComponent
  },
  {
    path:'services',
    component:VgServiceComponent
  },
  {
    path:'group-chat/:id',
    component:GroupChatComponent
  },
 
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentPageRoutingModule {}
