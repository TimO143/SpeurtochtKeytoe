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
            levensover: this.props.levens
        }
    }
    checkLevens() {
        console.log(this.state.levensover)
    }
    // geeft de layout van quiz met de props voor questionCount , Question en AnswerOption --> antwoord moet het input veld doorgeven
    render() {
        return (
            <div className='grid' key={this.props.questionId}>
                <div className='grid-questionCount'>
                    <QuestionCount counter={this.props.questionId} total={this.props.questionTotal} />
                </div>
                <div className='grid-hint'> {this.checkLevens() && <Hint counter={this.props.questionId - 1} />}</div>
                <div className='grid-question'>
                    <Question content={this.props.question} />
                </div>
                <div className='grid-answer'>
                    <AnswerOption
                        questionId={this.props.questionId}
                        onAnswerSelected={this.props.onAnswerSelected}
                    />
                </div>
                <span className="score grid-score">{this.props.score} <br /> Score</span>
                <span className="leven grid-leven">{this.props.levens} / 5 <br /> LEVEN</span>
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
