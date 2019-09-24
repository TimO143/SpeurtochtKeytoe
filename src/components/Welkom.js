import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import App from '../App'
import logo from '../svg/full_logo.svg'
import Admin from '../components/Admin'

class Welkom extends Component {
    constructor() {
        super();
        this.state = {
            naam: '',
        }
        this.handleChange = this.handleChange.bind(this);
    }

    // lelijke manier om de achtergrond kleur te veranderen
    componentDidMount() {
        document.body.style.backgroundColor = '#256eff'
    }
    
    renderAdmin() {
        return (ReactDOM.render(<Admin />, document.getElementById('root')))
    }
 

    handleChange(event) {
        this.setState({naam: event.target.value})
    }
    renderApp() {
        return (ReactDOM.render(<App naam={this.state.naam}/>, document.getElementById('root')))
    }

    render() {
        return (
            <div>
                <button onClick={e => { e.preventDefault(); this.renderAdmin() }}>Naar admin panel</button>
                <div className='grid'>
                        <div className="grid-logo"> <img src={logo} className="App-logo" alt="logo" /></div> 
                        <div className='grid-titel'>
                        <p className='Titel'>Welkom Kollega!</p>
                        </div>
                        <div className='grid-sub'>
                            <p className='sub'>Met de K van Keytoe</p>
                        </div>
                        <div className='grid-kop'>
                            <p className='Kop'>De kwizz</p>
                        </div>
                        <div className='grid-info'>
                            <p className='InfoTekst'>Leer je Kollega’s écht kennen. Keytoe, KeytoeY, Toscani… Durf te vragen, maar niet naar het directe antwoord. Het moet wel leuk blijven. Ben je al zenuwachtig? Mooi.</p>
                        </div>
                    <div className='grid-naamform'>
                        <form onSubmit={e => { e.preventDefault(); this.renderApp();  }}>
                            <div>
                                <input className='goInput' type='text' required placeholder='Je naam' onChange={this.handleChange}></input>
                            </div>
                            <div>
                                <input className='goBut' type='submit' value='Letsgooo!'></input>
                            </div>
                        </form>
                    </div>
                 </div>
            </div>)
    };
}

export default Welkom;
