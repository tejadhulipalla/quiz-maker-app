import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators  } from '@angular/forms';
import { QuizService } from '../../services/quiz.service';
import { Category, MainCategory, difficultyLevel} from '../../models/category';
import { questionAnswers } from '../../models/questions';
import { QuizMakerConstants } from '../../constants/quiz-maker.constant';
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from "ngx-spinner";
import { decode } from 'html-entities';

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.scss']
})
export class CreateQuizComponent implements OnInit, OnDestroy  {
  categoryList: MainCategory<Category[]>;
  questionResult: questionAnswers;
  amount = QuizMakerConstants.AMOUNT;
  type = QuizMakerConstants.TYPE;
  subscription: Subscription = new Subscription();

  difficultyLevels : difficultyLevel[] = [
    { name: 'Select Difficulty', level: '' },
    { name: 'Easy', level: 'easy' },
    { name: 'Medium', level: 'medium' },
    { name: 'Hard', level: 'hard' }
  ]

  constructor(private quizService: QuizService,
    private spinner: NgxSpinnerService,
    public fb: FormBuilder) { }

    CreateQuizFormGroup: FormGroup = this.fb.group({
    category: ['', [Validators.required]],
    difficulty: ['', [Validators.required]],
  })

  ngOnInit(): void {
    this.spinner.show();
    //to get list of categories
    this.subscription = this.quizService.getCategories().subscribe((res: MainCategory<Category[]>) => {
      this.categoryList = res;
    this.spinner.hide();
    })
  }

  createQuiz(): void {
    const category: string = this.CreateQuizFormGroup.get('category')?.value;
    const difficulty: string = this.CreateQuizFormGroup.get('difficulty')?.value
    this.spinner.show();
    //to get list of questions based on category and difficulty level
    this.subscription = this.quizService.getQuizQuestionsList(this.amount, category, difficulty, this.type)
      .subscribe((res: questionAnswers) => {
        this.questionResult = res;

        for (let option of this.questionResult.results) {
          option.question = decode(option.question);
          option.correct_answer = decode(option.correct_answer);
          option.selectedAnswer = '';

          //random index
          let insertrandomIndex = Math.floor(Math.random() * 4);

          //insert correct answer into array 
          option.incorrect_answers.splice(insertrandomIndex, 0, option.correct_answer)

          for (const [key, value] of option.incorrect_answers.entries()) {
            option.incorrect_answers[key] = decode(value);
          }
        }
        this.spinner.hide();
      })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}