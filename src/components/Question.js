import React from 'react';
import PropTypes from 'prop-types';

// laat de vraag zien in scherm
function Question(props) {
    return <div className='grid-question'>
        <h2 className="question">{props.content}</h2>
        </div>;
}

Question.propTypes = {
  content: PropTypes.string.isRequired
};

export default Question;
