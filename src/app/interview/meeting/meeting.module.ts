import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MeetingPageRoutingModule } from './meeting-routing.module';

import { MeetingPage } from './meeting.page';
import { CreateMettingLinkComponent } from './create-metting-link/create-metting-link.component';
import { BatchDetailComponent } from './batch-detail/batch-detail.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MeetingPageRoutingModule
  ],
  declarations: [MeetingPage,CreateMettingLinkComponent,BatchDetailComponent]
})
export class MeetingPageModule {}
