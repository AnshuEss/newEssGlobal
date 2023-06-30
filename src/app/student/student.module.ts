import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentPageRoutingModule } from './student-routing.module';

import { StudentPage } from './student.page';

import { TimeLineComponent } from './time-line/time-line.component';
import { ProfileComponent } from './profile/profile.component';
import { TestPaperComponent } from './test-paper/test-paper.component';
import { MettingComponent } from './metting/metting.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentPageRoutingModule
  ],
  declarations: [StudentPage,TimeLineComponent,ProfileComponent,TestPaperComponent,MettingComponent]
})
export class StudentPageModule {}
