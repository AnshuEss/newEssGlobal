import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PagesPageRoutingModule } from './pages-routing.module';

import { PagesPage } from './pages.page';


import { OtpComponent } from './otp/otp.component';
import { StudentLoginComponent } from './student-login/student-login.component';
import { StaffLoginComponent } from './staff-login/staff-login.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { OurBranchComponent } from './our-branch/our-branch.component';
import { StudyAbroadComponent } from './study-abroad/study-abroad.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    PagesPageRoutingModule
  ],
  declarations: [PagesPage,OtpComponent,StudentLoginComponent,
    StaffLoginComponent,ContactUsComponent,AboutUsComponent, StudyAbroadComponent,
    OurBranchComponent]
})
export class PagesPageModule {}
