import React from 'react';
import PropTypes from 'prop-types';

class AnswerOption extends React.Component {

    constructor() {
        super()
        this.state = {}
    }
    render() {
        return (
            <li className="answerOption">
                <form onSubmit={this.props.onAnswerSelected}>
                    <input
                        type="input"
                    //value={this.props.givenAnswer}
                    />
                </form>

            </li>
        );
    }
}



AnswerOption.propTypes = {
  answer: PropTypes.string.isRequired,
  onAnswerSelected: PropTypes.func.isRequired
  
};

export default AnswerOption;
