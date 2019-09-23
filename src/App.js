import React, { Component } from 'react';
import ReactDOM from 'react';
import quizQuestions from './api/quizQuestions';
import Quiz from './components/Quiz';
import Result from './components/Result';
import logo from './svg/keytoe_logo.svg';
import './App.css';
import { setTimeout } from 'timers';
import Hint from './components/Hint'


class App extends Component {
  constructor(props) {
    super(props);
      // initial state
    this.state = {
      counter: 0,
      questionId: 1,
      question: '',
      answerOptions: '',
      answersCount: {},
      result: 0, 
      leven: 5, 
      score: 0, 


      };
      
    // functie geimporteert vanuit AnswerOption en hier gedefined
    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
  }
        
    componentDidMount() {
        // verander kleur van achtergrond terug naar zwart
      document.body.style.backgroundColor = 'black'
      // gaat naar de eerste vraag
      this.setState({
        question: quizQuestions[0].question,
        answerOptions: quizQuestions[0].answers
    });
    }

    // na submit van een vraag komt deze functie
    handleAnswerSelected(value) {
        //  gaat naar volgende bij input
        if (quizQuestions[this.state.counter].answers === value || this.state.leven <= 1) {
            if (this.state.questionId < quizQuestions.length) {
                this.setNextQuestion();
            }
            else if (this.state.score === 0) {
                // dit is niet mooi. refresh page wanneer geen score is behaald
                //this.refreshPage();
                // kan niet score op 0 zetten dan rendered resultaten scherm niet
                this.setState({ result: 1 })
            }
            else {
                // update de score nog 1 laatste keer omdat er geen vragen meer zijn maar wel een update moet gebeuren
                this.updateScore();
                // timeout om het score te update en daarna in result te plaatsen
                setTimeout(() => { this.setResults() },1)
            }
        }
        else {
           this.lowerLife();
        }
  }

    updateScore() {
        if (this.state.leven === 5) {
            this.setState(state => {
                return {
                    score: state.score + (20 * state.leven)
                }
            }, () => { console.log(this.state.score) });
        }
        else if (this.state.leven === 1) {
            this.setState(state => {
                return {
                    score: state.score
                }
            }, () => { console.log(this.state.score) });
        }
        else {
            this.setState(state => {
                return {
                    score: state.score + (10 * state.leven)
                }
            }, () => { console.log(this.state.score) });
        }   
    }
    setNextQuestion(event) {
    const counter = this.state.counter + 1;
    const questionId = this.state.questionId + 1;

    this.updateScore();
      this.setState({
          counter: counter,
          questionId: questionId,
          question: quizQuestions[counter].question,
          answerOptions: quizQuestions[counter].answers,
          leven: 5         
    });
    }

    lowerLife() {
        const leven = this.state.leven - 1;
        if (leven >= 0) {
            this.setState({
                leven: leven
            })
        }
    }

    // voegt de score toe aan het resultaat ( check boven is een timeout die nodig is om niet de oude state van score te gebruiken)
    setResults = () => {
        this.setState({ result: this.state.score }, () => console.log(this.state.result, this.state.score));
    }

    // rendert de quiz op het scherm met de props van quiz
  renderQuiz() {
    return (
      <Quiz
            answerOptions={this.state.answerOptions}
            questionId={this.state.questionId}
            question={this.state.question}
            questionTotal={quizQuestions.length}
            onAnswerSelected={this.handleAnswerSelected}
            levens={this.state.leven}
            score={this.state.score}
      />
    );
  }

    // rendert het resultaat (oud resultaat moet nog verandert worden)
  renderResult() {
      return <Result quizResult={this.state.result} naam={this.props.naam} />;
      }

  render() {
    return (
        <div>
           <img src={logo} className="App-logo" alt="logo" />
            {this.state.result ? this.renderResult() : this.renderQuiz()}
             {this.state.leven <= 3 && <Hint counter={this.state.counter} />}
        </div>
       
    );
  }
}

export default App; 