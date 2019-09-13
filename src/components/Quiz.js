import React from 'react';
import PropTypes from 'prop-types';
import Question from '../components/Question';
import QuestionCount from '../components/QuestionCount';
import AnswerOption from '../components/AnswerOption';
import Hint from '../components/Hint';


function Quiz(props) {
    // geeft de layout van quiz met de props voor questionCount , Question en AnswerOption --> antwoord moet het input veld doorgeven
    return (
        <div className='grid' key={props.questionId}>
            <div className='grid-questionCount'>
                <QuestionCount counter={props.questionId} total={props.questionTotal} />
            </div>
            <div className='grid-hint'> {props.leven <= 3 || <Hint counter={props.questionId-1} />}</div>
            <div className='grid-question'>
                <Question content={props.question} />
            </div>
            <div className='grid-answer'>
          <AnswerOption 
              questionId={props.questionId}
              onAnswerSelected={props.onAnswerSelected}
                />
            </div>
            <span className="score grid-score">{props.score} <br /> Score</span>
            <span className="leven grid-leven">{props.levens} / 5 <br /> LEVEN</span>
      </div>
  );
}

Quiz.propTypes = {
  answerOptions: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
  questionId: PropTypes.number.isRequired,
  questionTotal: PropTypes.number.isRequired,
  onAnswerSelected: PropTypes.func.isRequired
};

export default Quiz;
