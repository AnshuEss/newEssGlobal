import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuestionPaperPage } from './question-paper.page';

import { AddQuestionComponent } from './add-question/add-question.component';
import { StudentScoreComponent } from './student-score/student-score.component';
import { ViewQuestionComponent } from './view-question/view-question.component';
import { AddStudentComponent } from './add-student/add-student.component';
const routes: Routes = [
  {
    path: '',
    component: QuestionPaperPage
  },
  {
    path: 'add-question',
    component: AddQuestionComponent
  },
  {
    path: 'student-score',
    component: StudentScoreComponent
  },

  {
    path: 'view-question',
    component: ViewQuestionComponent
  },

  {
    path: 'add-student',
    component: AddStudentComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuestionPaperPageRoutingModule {}
