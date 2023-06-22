import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PagesPageRoutingModule } from './pages-routing.module';

import { PagesPage } from './pages.page';

import { LoginComponent } from './login/login.component';
import { OtpComponent } from './otp/otp.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PagesPageRoutingModule
  ],
  declarations: [PagesPage,LoginComponent,OtpComponent]
})
export class PagesPageModule {}
