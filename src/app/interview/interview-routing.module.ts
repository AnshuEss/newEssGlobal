import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InterviewPage } from './interview.page';
import { ChatListComponent } from './chat-list/chat-list.component';

import { ChatsComponent } from './chats/chats.component';

<<<<<<< HEAD
=======
import { BannerComponent } from './banner/banner.component';
>>>>>>> 584999e4d73bd042bc0b74ce097bacda7ec989c2

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
    path: 'chats',
    component: ChatsComponent
  },
  {
<<<<<<< HEAD
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
=======
    path: 'banner',
    component: BannerComponent
>>>>>>> 584999e4d73bd042bc0b74ce097bacda7ec989c2
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InterviewPageRoutingModule {}
