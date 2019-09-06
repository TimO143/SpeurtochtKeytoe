import React from 'react';
import PropTypes from 'prop-types';

const errorStyle = { color: 'red' }
const input = ({ label, error, onChange, name, value }) => (
    <label>
        {label}
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
    // onChange functie die een event neemt om in de state de value te veranderen naar input value
    onChange = (e) => {
        this.setState({
            value: e.target.value.toLowerCase(),
        })
    }

    render() {
        return (
            <div className="answerOption">
                <form onSubmit={e => { e.preventDefault(); this.props.onAnswerSelected(this.state.value)}}>
                    <input
                        type='text'
                        placeholder="Je antwoord"
                        //value={form.userName}
                        onChange={this.onChange}
                        //error={asyncErrors.userName}
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
const input = ({ label, error, onChange, name, value }) => (
    <input name={name} type='text' value={value} onChange={onChange} required />
    )
                        type='text'
                        placeholder="Je antwoord"
            </div>