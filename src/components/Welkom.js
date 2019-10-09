import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import App from '../App'
import logo from '../svg/full_logo.svg'
import Panel from '../components/Panel'
import {nameAdd} from '../actions/action';
import { Provider } from "react-redux";
import store from '../store'
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';


class Welkom extends Component {
    constructor() {
        super();
        this.state = {
            questionData: [],
        }
        this.handleChange = this.handleChange.bind(this);
    }

    // lelijke manier om de achtergrond kleur te veranderen
    componentDidMount() {
        document.body.style.backgroundColor = '#256eff'
    }
    
    renderPanel() {
        ReactDOM.render(
            <Provider store={store}>
                <Panel/>
            </Provider>,
            document.getElementById('root')
         );
    }
 

    handleChange(event) {
        //console.log(event.target.value)
        //this takes the name input and displays it in the result screen
        this.props.nameAdd(event.target.value)  //< puts stuff in the payload in the actions (e.target.v) = payload
       // console.log(this.props.nameRe)
    }
    checkName() {
        console.log(store.getState())   
    }
    renderApp() {
        // u need this. App used to have values but not needed now
        ReactDOM.render(
            <Provider store = {store}>
                <App />;
            </Provider>,
            document.getElementById('root')
        );

    }

    render() {
        return (
            <div>
                <button className = "goButAdminPanel" onClick={e => { e.preventDefault(); this.renderPanel() }}>Naar admin panel</button>
                <div className='grid'>
                        <div className="grid-logo"> <img src={logo} className="App-logo" alt="logo" /></div> 
                        <div className='grid-titel'>
                        <p className='Titel'>WELKOM <br />KOLLEGA!</p>
                        </div>
                        <div className='grid-sub'>
                            <p className='sub'>MET DE K VAN KEYTOE</p>
                        </div>
                        <div className='grid-kop'>
                            <p className='Kop'>DE KWIZZ</p>
                        </div>
                        <div className='grid-info'>
                            <p className='InfoTekst'>Leer je Kollega's écht kennen. Keytoe, KeytoeY, Toscani... Durf te vragen, maar niet naar het directe antwoord. Het moet wel leuk blijven. Ben je al zenuwachtig? Mooi.</p>
                        </div>
                    <div className='grid-naamform'>
                        <form onSubmit={e => { e.preventDefault(); this.renderApp(); this.checkName() }}>
                            <div>
                                <input className='goInput' type='text' required placeholder='Je naam'  onChange={this.handleChange}></input>
                            </div>
                            <div>
                                <input className='goBut button' type='submit' value='LETSGOOO!'></input>
                            </div>
                        </form>
                    </div>
                 </div>
            </div>)
            
    };
}


const mapStateToProps = ({ scoreReducer }) => ({
    name: scoreReducer.name,
    score: 0,
    result: [],
    lives: 5
  });
  
  const mapDispatchToProps = dispatch =>
    bindActionCreators(
      {
        nameAdd
      },
      dispatch
    );

  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Welkom);



