import React from 'react';
import PropTypes from 'prop-types';
import quizQuestions from '../api/quizQuestions';

const errorStyle = { color: 'red' }
const Input = ({ label, error, onChange, name, value }) => (
    <label>
        {label}:
    <input name={name} type='text' value={value} onChange={onChange} required />
        {error && <span style={errorStyle}>{error}</span>}
    </label>
    )



class AnswerOption extends React.Component {

    constructor() {
        super()
        this.state = {
           value: null
        }
    }
    onChange = (e) => {
        this.setState({
            value: e.target.value
        })
    }

    render() {
        return (
            <li className="answerOption">
                <form onSubmit={e => { e.preventDefault(); this.props.onAnswerSelected(this.state.value)}}>
                    <Input
                        type='text'
                        //value={form.userName}
                        onChange={this.onChange}
                        //error={asyncErrors.userName}
                    />
                    <input type="submit" value="Submit"
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
