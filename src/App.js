import React ,{ Component } from 'react';
import logo from './logo.svg';
import './App.css';
import quizQuestions from './api/quizQuestions';
import Quiz from './components/Quiz'
import Result from './components/Result'

class App extends Component {
    // set initial state
    constructor(props){
        super(props);

        this.state = {
            counter: 0,
            questionId: 1,
            question: '',
            answerOptions: [],
            answer: '',
            answerCount: {},
            result: '',
            match: false
        };
        // hard bind event handler voor performance increase
        this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const shuffledAnswerOptions = quizQuestions.map((question) => this.shuffleArray(question.answers));

        this.setState({
            question: quizQuestions[0].question,
            answerOptions: shuffledAnswerOptions[0]
        });
    }

    // neem een random vraag uit de collectie
    shuffleArray(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // zolang er elementen zijn blijf shuffelen
        while (0 !== currentIndex) {

            // kies overgebleven element
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    };


    // als er de questionId lager is dan totaal blijf doorgaan naar volgende vraag
    handleAnswerSelected(event) {
        this.setUserAnswer(event.currentTarget.value) 
            if (this.state.questionId < quizQuestions.length) {
                setTimeout(() => this.setNextQuestion(), 300);
            } else {
                setTimeout(() => this.setResults(this.getResults()), 300);
            }
    }
    handleSubmit(event) {
        this.setUserAnswer(event.currentTarget.value)
        if (this.state.answer === this.value) {
            setTimeout(() => this.setNextQuestion(), 300);
        }
    }

    setUserAnswer(answer) {
        this.setState((state,props) => ({
            answerCount: {
                ...state.answerCount,
                [answer]: (state.answerCount[answer] || 0) + 1
            }
            ,
            answer: answer
        }));
    }

    // increment counter en questionId state en verander de question en answeroptions 
    setNextQuestion() {
        const counter = this.state.counter + 1;
        const questionId = this.state.questionId + 1;
        this.setState({
            counter: counter,
            questionId: questionId,
            question: quizQuestions[counter].question,
            answerOptions: quizQuestions[counter].answers,
            answer: ''
        });
    }

    // answerCountKeys geeft een string array terug met de props van het object
    // answerCountValues mapt over de array en returnt values, neemt hoogste nummer met Math.max.apply
    // dit wordt doorgegeven naar maxAnswerCount  en de key wordt vergeleken door de filter en dan gereturnd
    getResults() {
        const answersCount = this.state.answerCount;
        const answersCountKeys = Object.keys(answersCount);
        const answersCountValues = answersCountKeys.map(key => answersCount[key]);
        const maxAnswerCount = Math.max.apply(null, answersCountValues);

        return answersCountKeys.filter((key) => answersCount[key] === maxAnswerCount);
    }

    // krijgt resultaten van getResults in een array als het een value heeft wordt het geassign aan de state
    setResults(result) {
        if (result.length === 1) {
            this.setState({ result: result[0] });
        } else {
            this.setState({ result: 'Undetermined' });
        }
    }

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

    renderResult() {
        return <Result quizResult={this.state.result} />
        ;
    }

    // render wat er te zien is op het scherm
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

        super(props);

        this.state = {
            counter: 0,
            questionId: 2,
            question: '',
            answerOptions: [],
            answer: '',
            answerCount: {},
            result: '',
            match: false
        };
        // hard bind event handler voor performance increase
        this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);