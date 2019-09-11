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
                <div className='row align-items-end'>
                    <div className='col-md-1'></div>
                    <div className='col-md-6' >
                        <text className='Titel'>Welkom Kollega!</text>
                    </div>
                    <div className='col-md-5 '>
                        <text className='sub'>met de K van Keytoe</text>
                    </div>
               </div>
                <div>
                    <div className='row' style={{ marginTop:'40px' }}>
                        <div className='col-md-2'></div>
                        <div className='col-md-2'>
                            <text className='Kop'>De Kwizz </text>
                        </div>
                        <div>
                            <p className='InfoTekst'>Leer je Kollega's echt kennen. Keytoe, KeytoeY, Toscani... Durf te vragen, maar niet naar het directe antwoord. Het moet wel leuk blijven. Ben je al zenuwachtig? Mooi.</p>
                        </div>
                    </div>
                </div>

                <div>
                    <div className='row'>
                        <div className='col-md-4'></div>
                        <form onSubmit={e => { e.preventDefault(); this.renderApp() }}>
                            <div className='col-md-12'>
                                <input className='goInput' type='text' required placeholder='Je naam'></input>
                            </div>
                            <div className='col-md-8' style={{ marginBottom: '40px' }} >
                                <input className='goBut' type='submit' value='Letsgooo!'></input>
                            </div>
                            </form>
                    </div>
                </div>


            </div>)
    };
}

export default Welkom;
