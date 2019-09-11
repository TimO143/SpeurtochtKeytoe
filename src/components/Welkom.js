import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import App from '../App'

class Welkom extends Component {
    constructor() {
        super();
    }

    // lelijke manier om de achtergrond kleur te veranderen
    componentDidMount() {
        document.body.style.backgroundColor = '#256eff'
    }
  
    renderApp() {
        return (ReactDOM.render(<App />, document.getElementById('root')))
    }
    render() {
        return (
            <div >
               

                <div>
                    <div className='row'>
                        <div ></div>
                        <form onSubmit={e => { e.preventDefault(); this.renderApp() }}>
                            <div style={{ marginLeft: '40px' }} >
                                <input className='goInput' type='text' required placeholder='Je naam'></input>
                            </div>
                            <div style={{ marginBottom: '40px',marginLeft:'40px' }} >
                                <input className='goBut' type='submit' value='Letsgooo!'></input>
                            </div>
                            </form>
                    </div>
                </div>
            </div>)
    };
}

export default Welkom;
