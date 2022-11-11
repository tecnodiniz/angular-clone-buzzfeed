import { Component, OnInit } from '@angular/core';

import quizz_questions from '../../../assets/data/quizz_questions.json'

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit {
  title:string = '';

  questions:any;
  selectedQuestion:any;

  answers:string[] = [];
  selectedAnswer:string = '';

  quizOptions:any;

  questionIndex:number = 0;
  questionMaxIndex:number = 0;

  finished:boolean = false;


  constructor() { }


  ngOnInit(): void {

    if(quizz_questions){

      this.finished = false;

      this.questions = quizz_questions.questions;

      this.questionMaxIndex = this.questions.length

      this.title = quizz_questions.title

      this.selectedQuestion = this.questions[this.questionIndex]

      console.log(this.questionMaxIndex)
    }
  }

  // minha lógica ----------------
  // prosseguir(value:string):any{

  //   this.answers.push(value)

  //   this.questionIndex += 1;

  //   if(this.questionIndex < this.questionMaxIndex){

  //     this.selectedQuestion = this.questions[this.questionIndex]

  //     console.log(value);

  //   }else{
  //     console.log(this.answers)
  //     var heroi: number = 0;
  //     var vilao: number = 0;

  //     this.answers.map(letra => {if(letra == "A"){vilao++;}return vilao})

  //     this.answers.map(letra =>{if(letra =="B"){heroi++} return heroi})

  //     this.finished = true;

  //     return heroi > vilao ? this.selectedAnswer = quizz_questions.results.B:
  //     this.selectedAnswer = quizz_questions.results.A;

  //   }

  // }

  playerChoose(value:string):void{

    this.answers.push(value)
    this.questionIndex += 1;

    this.nextStep();

  }

  nextStep():void{

    if(this.questionIndex < this.questionMaxIndex){

      this.selectedQuestion = this.questions[this.questionIndex]

    }else{
      const result:string = this.checkResult(this.answers)
      this.selectedAnswer = quizz_questions.results[result as keyof typeof quizz_questions.results];

      this.finished = true
    }

  }
  checkResult(answers:string[]):string{
    const result = answers.reduce((previous,current,i,arr) =>{
      if(arr.filter(item => item == previous).length >
         arr.filter(item => item == current).length ){
          return previous
      }
      else return current;
    });
    return result;
  }

  restart():void{

    this.finished = false;

    this.questionIndex = 0;

    this.answers = [];

    this.selectedQuestion = this.questions[this.questionIndex]


  }

}
