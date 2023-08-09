import { NgModule , CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CreateQuizComponent } from './components/create-quiz/create-quiz.component';
import { QuizQuestionsComponent } from './components/quiz-questions/quiz-questions.component';
import { QuizResultComponent } from './components/quiz-result/quiz-result.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateQuizComponent,
    QuizQuestionsComponent,
    QuizResultComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    BrowserAnimationsModule
  ],
  exports:[NgxSpinnerModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
