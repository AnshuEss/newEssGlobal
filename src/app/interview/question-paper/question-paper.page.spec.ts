import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuestionPaperPage } from './question-paper.page';

describe('QuestionPaperPage', () => {
  let component: QuestionPaperPage;
  let fixture: ComponentFixture<QuestionPaperPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(QuestionPaperPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
