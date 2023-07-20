import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InterviewPage } from './interview.page';
import { ChatListComponent } from './chat-list/chat-list.component';

import { ChatsComponent } from './chats/chats.component';
import { BannerComponent } from './banner/banner.component';
import { AttendanceComponent } from './attendance/attendance.component';
const routes: Routes = [
  {
    path: '',
    component: InterviewPage
  },
  {
    path: 'chat-list',
    component: ChatListComponent
  },
  {
    path: 'chat/:id',
    component: ChatsComponent
  },
  {
    path: 'banner',
    component: BannerComponent
  },
  {
    path: 'attendance',
    component: AttendanceComponent
  },
  {
    path: 'question-paper',
    loadChildren: () => import('./question-paper/question-paper.module').then( m => m.QuestionPaperPageModule)
  },
  {
    path: 'meeting',
    loadChildren: () => import('./meeting/meeting.module').then( m => m.MeetingPageModule)
  },
  {
    path: 'support',
    loadChildren: () => import('./support/support.module').then( m => m.SupportPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InterviewPageRoutingModule {}
