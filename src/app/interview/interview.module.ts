import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InterviewPageRoutingModule } from './interview-routing.module';

import { InterviewPage } from './interview.page';

import { ChatListComponent } from './chat-list/chat-list.component';

import { ChatsComponent } from './chats/chats.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InterviewPageRoutingModule
  ],
  declarations: [InterviewPage,ChatListComponent,ChatsComponent]
})
export class InterviewPageModule {}
