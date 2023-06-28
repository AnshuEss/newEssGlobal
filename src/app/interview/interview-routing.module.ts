import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InterviewPage } from './interview.page';
import { ChatListComponent } from './chat-list/chat-list.component';

import { ChatsComponent } from './chats/chats.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InterviewPageRoutingModule {}
