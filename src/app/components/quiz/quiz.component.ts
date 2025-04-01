import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import quizQuestions from '../../../../public/data/quiz_questions.json';

@Component({
  selector: 'app-quiz',
  imports: [
    NgIf,
    NgForOf
  ],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})
export class QuizComponent implements OnInit {

  title: string = '';
  questions: any = '';
  questionSelected: any = '';
  answers: string[] = [];
  answerSelected: string = '';
  questionIndex: number = 0;
  questionMaxIndex: number = 0;
  finished: boolean = false;

  constructor() { }

  ngOnInit() {
    if(quizQuestions) {
      this.finished = false;
      this.title = quizQuestions.title;
      this.questions = quizQuestions.questions;
      this.questionSelected = this.questions[this.questionIndex];
      this.questionIndex = 0;
      this.questionMaxIndex = this.questions.length;
    }
  }

  playerChoose(value: string) {
    this.answers.push(value);
    this.nextStep();
  }

  async nextStep() {
    this.questionIndex += 1;
    if(this.questionMaxIndex > this.questionIndex) {
      this.questionSelected = this.questions[this.questionIndex];
    } else {
      const finalAnswer = await this.checkResult(this.answers);
      this.finished = true;
      this.answerSelected = quizQuestions.results[finalAnswer as keyof typeof quizQuestions.results];
    }
  }

  async checkResult(answers: string[]) {
    return answers.reduce((previous, current, i, arr) => {
      if (
        arr.filter(item => item === previous).length >
        arr.filter(item => item === current).length
      ) {
        return previous;
      } else {
        return current;
      }
    });
  }
}
