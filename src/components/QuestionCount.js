import React from 'react';
import PropTypes from 'prop-types';

// geeft de count aan van welke vraag je bent en totaal
function QuestionCount(props) {
  return (
    <div className="questionCount grid-questionCount">
      <span className='vraagWeg'>VRAAG</span> <span className="currentQuestion">{props.counter}</span> <span className="totalQuestions">/ {props.total}</span>
    </div>
  );
}

QuestionCount.propTypes = {
  counter: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired
};

export default QuestionCount;
