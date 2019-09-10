import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import App from '../App'

class Welkom extends Component {
    constructor() {
        super();
        this.state = {
            something: 'aa'
        }
    }

    renderApp() {
        return (ReactDOM.render(<App />, document.getElementById('root')))
    }
    render() {
        return (
            <div>
                <form onSubmit={e => { e.preventDefault();this.renderApp() }}>
                    <input type='submit' value='start de quiz' >
                     </input>
                </form>

            </div>)
    };
}

export default Welkom;
