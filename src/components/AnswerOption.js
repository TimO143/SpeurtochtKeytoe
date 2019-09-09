import React from 'react';
import PropTypes from 'prop-types';

class AnswerOption extends React.Component {
    constructor() {
        super()
        this.state = {
            value: null
        }
    }
    // onChange functie die een event neemt om in de state de value te veranderen naar input value
    onChange = (e) => {
        this.setState({
            value: e.target.value.toLowerCase()
        })
    }
    clearform = () => {
        document.getElementById('myForm').reset();
    }

    render() {
        return (
            <div className="answerOption">
                <form id='myForm' onSubmit={e => { e.preventDefault(); this.props.onAnswerSelected(this.state.value); this.clearform()}}>
                    <input
                        type='text'
                        placeholder="Je antwoord"
                        onChange={this.onChange}
                        required
                    />
                </form>
            </div>
        );
    }
}

AnswerOption.propTypes = {
  onAnswerSelected: PropTypes.func.isRequired
};

export default AnswerOption
