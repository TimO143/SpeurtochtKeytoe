import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import store from '../store'
import Result from '../components/Result'
import {nameAdd, addScore} from '../actions/action';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

class NewPage extends React.Component{
    constructor(props){
        super(props);
        
        this.state = {

        }
    }

    componentDidMount(){
        document.body.style.backgroundColor = '#256eff'
    }

    renderResult() {
        ReactDOM.render(
            <Provider store={store}>
                <Result />;
            </Provider>,
            document.getElementById('root')
        );
    }

    render(){
        return(
            <div className = "grid">
                    <div className = "grid-resButton">
                        <button className="resButton" onClick={this.renderResult}>RANGLIJST</button>
                    </div>
                    <div className = "grid-gongText">
                        <h1 className = "gongText">GEEF EEN MEP <br /> OP DIE GONG!</h1>
                    </div>
                    <div className = "grid-klaarText">
                        <h2 className = "klaarText">Je hebt het voor elkaar gebokst! Je kent je kollega's alweer heel <br />
                        wat beter. Maar hoe heb je het gedaan?</h2>
                    <hr className='balk'></hr>
                    </div>
                    <div className = "grid-scoreRes">
                    <p className="scoreRes">{Math.round(this.props.scoreRe)}</p>
                    </div>
                    <div className = "grid-resText">
                        <h1 className = "resText">PUNTEN GESCOORD!</h1>
                    </div>
                    
            </div>
        )
    }


}

const mapStateToProps = ({ scoreReducer }) => ({
    nameRe: scoreReducer.nameRe,
    scoreRe: scoreReducer.scoreRe,
    result: [],
    lives: 5
    });
    
    const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
        nameAdd,
        addScore
        },
        dispatch
    );

    
    export default connect(
    mapStateToProps,
    mapDispatchToProps
    )(NewPage);

    

