import React from 'react';
//import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

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


        };
    }

    handleAnswerChange = evt => {
        this.setState({ answer: evt.target.value });
    };
    handleSubmit = evt => {
        if (!this.canBeSubmitted()) {
            evt.preventDefault();
            return;
        }
        const { answer } = this.state;
        alert('success');
    };

    canBeSubmitted() {
        const error = validate(this.state.answer);
        const isDisabled = Object.keys(error).some(x => error[x]);
    }

    render() {
        const error = validate(this.state.answer);
        const isDisabled = Object.keys(error).some(x => error[x]);
        return(
        <form onSubmit={this.handleSubmit}>
            <input
                className={error.answer ? "error" : ""}
                type="text"
                placeholder="ANSWER HERE"
                value={this.state.answer}
                onChange={this.handleAnswerChange}
            />
            <button disabled={isDisabled}>SUBMIT</button>
        </form>
            );
        }

}

const rootElement = document.getElementById("root");
ReactDOM.render(<AnswerSubmit />, rootElement);

//AnswerOption.propTypes = {
//  //answerType: PropTypes.string.isRequired,
//  //answerContent: PropTypes.string.isRequired,
//  answer: PropTypes.string.isRequired,
//  onAnswerSelected: PropTypes.func.isRequired
//};

export default AnswerSubmit;
