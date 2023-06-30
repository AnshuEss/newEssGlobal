import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagesPage } from './pages.page';
import { OtpComponent } from './otp/otp.component';
import { StudentLoginComponent } from './student-login/student-login.component';
import { StaffLoginComponent } from './staff-login/staff-login.component';
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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesPageRoutingModule {}
