import React from 'react';
import PropTypes from 'prop-types';
import cancel from '../svg/icon.png';


class AnswerOption extends React.Component {
    constructor() {
        super()
        this.state = {
            value: null,
            hidden: true,
            errormsgs: ['Wat een pech toch!', ' Hahaha, nee', 'Niet gokke he!','Ach, kom op nou!','Niet opgeven nu...','Je bent er... nog lang niet','Helaas, pindakaas','Goed bezig! Not...','So close, yet so far']
        }
    }

    // onChange functie die een event neemt om in de state de value te veranderen naar input value
    onChange = (e) => {
        this.setState({
            value: e.target.value.toLowerCase(),
            hidden: true
        })

    }

    toggleHidden() {
        this.setState({
            hidden: false
        })
        
        
    }

    getRandom(errors) {
        return errors[Math.floor(Math.random() * errors.length)];
    }

    clearform() {
        document.getElementById("myForm").reset()
    }
    render() {
        return (
            <div className="answerOption">
                <form id='myForm' onSubmit={e => { e.preventDefault(); this.props.onAnswerSelected(this.state.value); this.clearform(); this.toggleHidden() }}>
                    <input
                        className='goInputSmall'
                        type='text'
                        placeholder="Je antwoord"
                        onChange={this.onChange}
                        required
                    />
                    <br />
                    {!this.state.hidden && <div>
                        <span>
                            <img src={cancel} className="Cancel-logo" alt="cancel" />
                            <span className='error'>{this.getRandom(this.state.errormsgs)}</span>
                           <br/><br/> <hr/>
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

    