import React from 'react';
import PropTypes from 'prop-types';
import cancel from '../svg/icon.png';

class AnswerOption extends React.Component {
    constructor() {
        super()
        this.state = {
            value: null,
            hidden: true
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

    clearform = () => {
        document.getElementById('myForm').reset();
    }

    
    toggleHidden() {
        this.setState({
            hidden: !this.state.hidden
        })
        setTimeout(() => {
            this.setState(() => ({ hidden: true }))
        }, 2000);
        
    }
    

  
    render() {
        return (
            <div className="answerOption">
                <form id='myForm' onSubmit={e => { e.preventDefault(); this.props.onAnswerSelected(this.state.value); this.clearform(); this.toggleHidden() }}>
                    <input
                        type='text'
                        placeholder="Je antwoord"
                        onChange={this.onChange}
                        required
                    />
                    <br />
                    {!this.state.hidden && <div>
                        <span>
                            <img src={cancel} className="Cancel-logo" alt="cancel" />
                            <span className='error'>Dacht t niet</span>
                        </span>
                    </div>
                    }
                </form>
            </div>
        );
    }
}






AnswerOption.propTypes = {
  onAnswerSelected: PropTypes.func.isRequired
};

export default AnswerOption

    