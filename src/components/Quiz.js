import React from 'react';
import PropTypes from 'prop-types';
import Question from '../components/Question';
import QuestionCount from '../components/QuestionCount';
import AnswerOption from '../components/AnswerOption';

function Quiz(props) {
  
  console.log(props)
  return (
      <div key={props.questionId}>
        <QuestionCount counter={props.questionId} total={props.questionTotal} />
          <Question content={props.question} />
          <AnswerOption 
              answer={props.answer}
              questionId={props.questionId}
              onAnswerSelected={props.onAnswerSelected}
          />

      </div>
  );
}

Quiz.propTypes = {
  //answer: PropTypes.string.isRequired,
  answerOptions: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
  questionId: PropTypes.number.isRequired,
  questionTotal: PropTypes.number.isRequired,
  onAnswerSelected: PropTypes.func.isRequired
};

export default Quiz;
