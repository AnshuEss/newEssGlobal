import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuestionPaperPageRoutingModule } from './question-paper-routing.module';

import { QuestionPaperPage } from './question-paper.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuestionPaperPageRoutingModule
  ],
  declarations: [QuestionPaperPage]
})
export class QuestionPaperPageModule {}
