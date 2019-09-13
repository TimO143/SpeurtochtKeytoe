import React from 'react';
import PropTypes from 'prop-types';

function Result(props) {
  return (
      <div className="resultPage">
          <strong>{props.naam} Je score: {props.quizResult}</strong>!
      </div>
  );
}

Result.propTypes = {
  quizResult: PropTypes.number.isRequired
};

export default Result;
