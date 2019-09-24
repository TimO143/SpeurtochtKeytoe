import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import App from '../App'
import logo from '../svg/full_logo.svg'
import constant from '../api/constant'
import {nameAdd} from '../actions/action';
import store from '../store'
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import scoreBoardReducer from '../reducers/reducer';

class Welkom extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            questionData: [],
            posts:[]
        }
        this.handleChange = this.handleChange.bind(this);
    }

    // lelijke manier om de achtergrond kleur te veranderen
    componentDidMount() {
        document.body.style.backgroundColor = '#256eff'


        let url = constant;
        fetch(url)
            .then(res => res.json())
            .then(data => {console.log(data)
                this.setState({questionData:data})
            })
    }

    //postData() {
    //    let url1 = 'http://192.168.5.102:4000/post'
    //     fetch(url1, {
    //            method: 'POST',
    //            headers: {
    //                'Content-Type': 'application/json'
    //            },
    //            body: JSON.stringify(ids)
    //        }
    //    }

 

    handleChange(event) {
        console.log(event.target.value)
        this.setState({name: event.target.value})
        console.log(this.props.nameAdd(event.target.value))
    }
    checkName() {
        console.log(store.getState())   
        console.log(this.props)
    }
    renderApp() {
        return (ReactDOM.render(<App name={this.state.name}/>, document.getElementById('root')))
    }

    render() {
        return (
            <div >
                <div className='grid'>
                    <div className='grid-logo'>
                        {this.state.questionData.map(({ question, hint, answer }) => <div key={question}>{question}---{answer}----{hint}</div>)}
                    </div>

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
                            <p className='InfoTekst'>Leer je Kollega�s �cht kennen. Keytoe, KeytoeY, Toscani� Durf te vragen, maar niet naar het directe antwoord. Het moet wel leuk blijven. Ben je al zenuwachtig? Mooi.</p>
                        </div>
                    <div className='grid-naamform'>
                        <form onSubmit={e => { e.preventDefault(); this.renderApp(); this.checkName() }}>
                            <div>
                                <input className='goInput' type='text' required placeholder='Je naam'  onChange={this.handleChange}></input>
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



