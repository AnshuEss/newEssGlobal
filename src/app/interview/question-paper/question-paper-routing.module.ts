import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuestionPaperPage } from './question-paper.page';

const routes: Routes = [
  {
    path: '',
    component: QuestionPaperPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuestionPaperPageRoutingModule {}
