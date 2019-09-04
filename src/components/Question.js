import React from 'react';
import PropTypes from 'prop-types';

// geen class syntax voor dit component omdat het een 'stateless presentation component' is
// dit is beter omdat je hiermee boilerplate code niet hoeft te gebruiken
function Question(props) {
    return <h2 className="question">{props.content}</h2>
    ;
}

// let op het is propTypes en niet PropTypes, ook isRequired en niet IsRequired
Question.propTypes = {
    content: PropTypes.string.isRequired
};

export default Question