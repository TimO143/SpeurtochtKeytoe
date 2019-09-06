import React, { Component } from 'react';
import quizQuestions from './api/quizQuestions';
import Quiz from './components/Quiz';
import Result from './components/Result';
import logo from './svg/logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0,
      questionId: 1,
      question: '',
      answerOptions: '',
      answer: '',
      answersCount: {},
      result: ''
    };

    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
  }

    componentDidMount() {
      // gaat naar de eerste vraag
      this.setState({
        question: quizQuestions[0].question,
        answerOptions: quizQuestions[0].answers
    });
  }


    handleAnswerSelected(value) {
        //  gaat naar volgende bij input
        
        if (quizQuestions[this.state.counter].answers === value) {
            if (this.state.questionId < quizQuestions.length) {
                this.setNextQuestion();
            } else {
                this.setResults(this.getResults());
            }
        }
  }


  

  setNextQuestion(event) {
    const counter = this.state.counter + 1;
    const questionId = this.state.questionId + 1;

    this.setState({
      counter: counter,
      questionId: questionId,
      question: quizQuestions[counter].question,
      answerOptions: quizQuestions[counter].answers,
      //answer: ""
    });
  }

    // houd de count bij vergeleken met totale count
  getResults() {
    const answersCount = this.state.answersCount;
    const answersCountKeys = Object.keys(answersCount);
    const answersCountValues = answersCountKeys.map(key => answersCount[key]);
    const maxAnswerCount = Math.max.apply(null, answersCountValues);

    return answersCountKeys.filter(key => answersCount[key] === maxAnswerCount);
  }

  setResults(result) {
    if (result.length === 1) {
      this.setState({ result:"je hebt het einde gehaald" });
    } else {
      this.setState({ result: 'Deze else doet niet echt iets' });
    }
  }

    // rendert de quiz op het scherm met de props van quiz
  renderQuiz() {
    return (
      <Quiz
        answer={this.state.answer}
        answerOptions={this.state.answerOptions}
        questionId={this.state.questionId}
        question={this.state.question}
        questionTotal={quizQuestions.length}
        onAnswerSelected={this.handleAnswerSelected}
      />
    );
  }

    // rendert het resultaat (oud resultaat moet nog verandert worden)
  renderResult() {
    return <Result quizResult={this.state.result} />;
  }

    // rendert de algemene layout en het resultaat als het er is anders rendert het de quiz
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>React Quiz</h2>
        </div>
        {this.state.result ? this.renderResult() : this.renderQuiz()}
      </div>
    );
  }
}

export default App;
