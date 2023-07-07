import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { QuestionPaperPageRoutingModule } from './question-paper-routing.module';

import { QuestionPaperPage } from './question-paper.page';
import { AddQuestionComponent } from './add-question/add-question.component';
import { StudentScoreComponent } from './student-score/student-score.component';
import { ViewQuestionComponent } from './view-question/view-question.component';
import { AddStudentComponent } from './add-student/add-student.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    QuestionPaperPageRoutingModule
  ],
  declarations: [QuestionPaperPage,AddQuestionComponent,StudentScoreComponent,ViewQuestionComponent,AddStudentComponent]
})
export class QuestionPaperPageModule {}
