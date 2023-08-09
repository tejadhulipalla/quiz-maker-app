import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateQuizComponent } from './components/create-quiz/create-quiz.component';
import { QuizQuestionsComponent } from './components/quiz-questions/quiz-questions.component';
import { QuizResultComponent } from './components/quiz-result/quiz-result.component'

const routes: Routes = [
  {
    path: '', 
    redirectTo: 'create-quiz', 
    pathMatch: 'full'
  },
  {
    path: 'create-quiz',
    component: CreateQuizComponent
  },
  {
    path: 'quiz-result',
    component: QuizResultComponent
  },
  {
    path:'**',
    component: CreateQuizComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
