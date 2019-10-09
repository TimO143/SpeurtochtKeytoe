import React, { Component } from 'react';
import Quiz from './components/Quiz';
import logo from './svg/keytoe_logo.svg';
import './App.css';
import { Provider } from "react-redux";
import { setTimeout } from 'timers';
import store from './store';
import {nameAdd, addScore} from './actions/action';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import NewPage from './components/NewPage';
import URL from './components/constant'


class App extends Component {
  constructor(props) {
    super(props);
      // initial state
    this.state = {
      counter: 0,
      questionId: 1,
      question: '',
      answerOptions: '',
      result: 0,
      leven: 5,
      score: 0,
      hint: '',
      position: 0,
      items:[]
      };
      
    // functie geimporteert vanuit AnswerOption en hier gedefined
    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
    }

    componentDidMount() {
        // verander kleur van achtergrond terug naar zwart
        document.body.style.backgroundColor = 'black'

        let url = URL
        fetch(url)
            .then(res => res.json())
            .then(data => {
                //console.log(data)
                //console.log(data[0].question, data[0].answer,data[0].hint)
                this.setState({ items: data, question: data[0].question, answerOptions: data[0].answer,hint:data[0].hint })
            }).catch(err =>
                console.log(err))
    }


    // na submit van een vraag komt deze functie
    handleAnswerSelected(value) {
        //  gaat naar volgende bij input
        if (this.state.items[this.state.counter].answer === value || this.state.leven <= 1) {
           // console.log(this.state.items.length, this.state.questionId)
            if (this.state.questionId < this.state.items.length) {
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
          question: this.state.items[counter].question,
          answerOptions: this.state.items[counter].answer,
          hint: this.state.items[counter].hint,
          
          leven: 5         
        });
        //console.log(this.state.items[counter], counter)
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
        this.props.addScore(this.state.score)  
            let url1 = URL+'/createUserAndScore'
            fetch(url1, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "username": this.props.nameRe ,"score": this.props.scoreRe}) //add score later and adjust the query in server.js
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                })
                .then(this.setState({ result: this.state.score }, () => console.log(this.state.result, this.state.score, this.props.nameRe, this.props.scoreRe))
                )
    }

    // rendert de quiz op het scherm met de props van quiz
    renderQuiz() {
    return (
      <Quiz
            answerOptions={this.state.answerOptions}
            questionId={this.state.counter+1}
            question={this.state.question}
            questionTotal={this.state.items.length}
            onAnswerSelected={this.handleAnswerSelected}
            levens={this.state.leven}
            score={this.state.score}
            hint={this.state.hint}
      />
    );
  }
                     
  newPage= () =>{
    return(
        <Provider store={store}>
            <NewPage />;
        </Provider>
        
    );
  }
 


    

    render() {
    return (
        <div>
           <img src={logo} className="App-logo" alt="logo" />
            {this.state.result ? this.newPage()  : this.renderQuiz()}
        </div>
       
    );
  }
}

const mapStateToProps = ({ scoreReducer }) => ({
    nameRe: scoreReducer.nameRe,
    scoreRe: scoreReducer.scoreRe,
    result: [],
    lives: 5
  });
  
  const mapDispatchToProps = dispatch =>
    bindActionCreators(
      {
        nameAdd,
        addScore
      },
      dispatch
    );

  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(App);
