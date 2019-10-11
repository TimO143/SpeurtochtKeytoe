import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from "react-redux";
import store from "../store";
import Welkom from '../components/Welkom'
import Admin from '../components/Admin'
import logo from '../svg/full_logo.svg'


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
        return username === 'keytoe' && password ==='iserniet';
    }

    render() {
        const isEnabled = this.canBeSubmitted();
            return (
                <div>
                    <button className = "goButAdminPanel" onClick={this.renderWelkom} >Naar de Quiz</button>
                    <form>
                        <div className = "grid">
                        <div className="grid-logo-Admin"> <img src={logo} className="App-logo" alt="logo" /></div>
                            <div className = "grid-loginText">
                                <h1 className = "loginText">INLOGGEN</h1>
                            </div>
                            <div className = "grid-username">
                                <input className = "panel-input" type='text' placeholder='Username' onChange={this.handleUsernameChange}></input>
                            </div>
                            <div className = "grid-password">
                                <input className = "panel-input" type='password' placeholder='Password' onChange={this.handlePasswordChange}></input>
                            </div>
                        
                            <div className = "grid-login-button">
                                {!isEnabled ? <button className = "goButAdminPanel" onClick={e => e.preventDefault()} disabled={!isEnabled}> Nope </button> : <button className = "goButAdminPanel"onClick={this.renderLogin}>Yep</button>}
                            </div>
                        </div>
                    </form>
                </div>)
        }
    
}

export default Panel