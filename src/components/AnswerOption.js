import React from 'react';
import PropTypes from 'prop-types'

function AnswerOption(props) {
    return (
        //presentational component
        <li className='answerOption'>
            <form onSubmit={props.handleSubmit}>
            <input
                    type='input'
                    //className='radioCustomButton'
                    //name='radioGroup'
                    //checked={props.answerType === props.answer}
                    id={props.answerType}
                    //value={props.answerType}
                    disabled={props.answer}
                    //onChange={props.onAnswerSelected}
                    value={props.answerType}
                />
            </form>
            <input type="submit" value="Submit" />
            <label className="radioCustomLabel" htmlFor={props.answerType}>
                {props.answerContent}
            </label>
        </li>
    );
}
    // container component
    AnswerOption.propTypes = {
        answerType: PropTypes.string.isRequired,
        answerContent: PropTypes.string.isRequired,
        answer: PropTypes.string.isRequired,
        onAnswerSelected: PropTypes.func.isRequired
    };

export default AnswerOption;