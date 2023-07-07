import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentPageRoutingModule } from './student-routing.module';

import { StudentPage } from './student.page';

import { TimeLineComponent } from './time-line/time-line.component';
import { ProfileComponent } from './profile/profile.component';
import { TestPaperComponent } from './test-paper/test-paper.component';
import { MettingComponent } from './metting/metting.component';
import { DemoComponent } from './demo/demo.component';
import { SupportComponent } from './support/support.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentPageRoutingModule,

  ],
  declarations: [StudentPage,TimeLineComponent,ProfileComponent,TestPaperComponent,MettingComponent,DemoComponent,SupportComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StudentPageModule {}
