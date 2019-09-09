import React from 'react';
import PropTypes from 'prop-types';

// laat de vraag zien in scherm
function Question(props) {
  return <h2 className="question">{props.content}</h2>;
}

Question.propTypes = {
  content: PropTypes.string.isRequired
};

export default Question;
