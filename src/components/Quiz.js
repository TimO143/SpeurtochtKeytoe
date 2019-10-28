import React from 'react';
import PropTypes from 'prop-types';
import Question from '../components/Question';
import QuestionCount from '../components/QuestionCount';
import AnswerOption from '../components/AnswerOption';
import Hint from '../components/Hint';


class Quiz extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }


    // geeft de layout van quiz met de props voor questionCount , Question en AnswerOption --> antwoord moet het input veld doorgeven
    render() {
        return (
            <div className='grid' key={this.props.questionId}>
                <div className='grid-questionCount'>
                    <QuestionCount counter={this.props.questionId} total={this.props.questionTotal} />
                </div>
                {this.props.levens <= 2 ?
                    <div className='grid-hint'>  <Hint hint={this.props.hint} /></div>
                    :
                    ''
                    }
                <div className='grid-question'>
                    <Question content={this.props.question} />
                    {console.log(this.props.levens)}
                </div>
                <div className='grid-answer'>
                    <AnswerOption
                        questionId={this.props.questionId}
                        onAnswerSelected={this.props.onAnswerSelected}
                    />
                </div>
                <span className="score grid-score"><span className="quiz-part-life">{Math.trunc(this.props.score)}</span> <br /> PUNTEN</span>
                <span className="leven grid-leven"><span className="quiz-part-life">{this.props.levens}</span> <span className="quiz-total-life">/ 5</span> <br /> LEVENS</span>
            </div>
        );
    }
}

Quiz.propTypes = {
  answerOptions: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
  questionId: PropTypes.number.isRequired,
  questionTotal: PropTypes.number.isRequired,
  onAnswerSelected: PropTypes.func.isRequired
};

export default Quiz;
