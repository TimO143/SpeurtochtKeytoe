import React from 'react';
import PropTypes from 'prop-types';
import Question from '../components/Question';
import QuestionCount from '../components/QuestionCount';
import AnswerOption from '../components/AnswerOption';

function Quiz(props) {
  
    //console.log(props)
    // geeft de layout van quiz met de props voor questionCount , Question en AnswerOption --> antwoord moet het input veld doorgeven
  return (
      <div key={props.questionId}>
        <QuestionCount counter={props.questionId} total={props.questionTotal} />
          <Question content={props.question} />
          <AnswerOption 
              questionId={props.questionId}
              onAnswerSelected={props.onAnswerSelected} />
          <span class='score'> Score: {props.score}</span> 
          <span class='leven'> Levens: {props.levens} / 5</span>
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
