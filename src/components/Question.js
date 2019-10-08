import React from 'react';
import PropTypes from 'prop-types';

// laat de vraag zien in scherm
function Question(props) {
    return <div className='grid-question'>
        <p className="question">{props.content}</p>
        </div>;
}

Question.propTypes = {
  content: PropTypes.string.isRequired
};

export default Question;
