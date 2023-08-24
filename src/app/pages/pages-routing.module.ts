import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagesPage } from './pages.page';
import { OtpComponent } from './otp/otp.component';
import { StudentLoginComponent } from './student-login/student-login.component';
import { StaffLoginComponent } from './staff-login/staff-login.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { OurBranchComponent } from './our-branch/our-branch.component';
import { StudyAbroadComponent } from './study-abroad/study-abroad.component';
import { PostLandingComponent } from './post-landing/post-landing.component';
const routes: Routes = [
  {
    path: '',
    component: PagesPage
  },
  {
    path: 'student-login',
    component: StudentLoginComponent
  },
  {
    path: 'staff-login',
    component: StaffLoginComponent
  },
  {
    path: 'otp',
    component: OtpComponent
  },
  {
    path: 'contact-us',
    component: ContactUsComponent
  },
  {
    path: 'about-us',
    component: AboutUsComponent
  },
  {
    path: 'our-branch',
    component: OurBranchComponent
  }, 
  {
    path: 'study-abroad',
    component:StudyAbroadComponent
  },
  {
    path: 'post-landing',
    component:PostLandingComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesPageRoutingModule {}
