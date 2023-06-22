import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagesPage } from './pages.page';

import { LoginComponent } from './login/login.component';
import { OtpComponent } from './otp/otp.component';
const routes: Routes = [
  {
    path: '',
    component: PagesPage
  },
  {
    path: 'login',
    component: LoginComponent
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
