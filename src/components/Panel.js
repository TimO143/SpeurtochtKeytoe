import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from "react-redux";
import store from "../store";
import Welkom from '../components/Welkom'
import Admin from '../components/Admin'

class Panel extends React.Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: ''
        }
    }
        renderWelkom = () => {
            ReactDOM.render(
                <Provider store={store}>
                    <Welkom />
                </Provider>,
                document.getElementById('root')
            );
    }

    renderLogin = () => {
        ReactDOM.render(
            <Provider store={store}>
                <Admin />
            </Provider>,
            document.getElementById('root')
        );
    }

    handleUsernameChange = e => {
        this.setState({ username: e.target.value })
    }
    handlePasswordChange = e => {
        this.setState({ password: e.target.value })
    }

    canBeSubmitted() {
        const { username,password } = this.state;
        return username === 'Hoi' && password.length > 0;
    }

    render() {
        const isEnabled = this.canBeSubmitted();
            return (
                <div>
                    <button onClick={this.renderWelkom} >Naar de Quiz</button>
                    <form>
                        <input type='text' onChange={this.handleUsernameChange}></input>
                        <input type='text' onChange={this.handlePasswordChange}></input>
                        {!isEnabled ? <button onClick={e => e.preventDefault()} disabled={!isEnabled}> Naar admin </button> : <button onClick={this.renderLogin}>Naar admin</button>}
                    </form>
                </div>
                )
        }
    
}

export default Panel