//imports
import React from 'react';
import App from '../App';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import store from '../store'
import Result from '../components/Result'
import {nameAdd, addScore} from '../actions/action';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import scoreReducer from '../reducers/reducer';

class NewPage extends React.Component{
    constructor(props){
        super(props);
        
        this.state = {

        }
    }

    componentDidMount(){
        
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
            <div>
                <button onClick={this.renderResult}>KLIK DAN</button>
                <strong style={{color:'white'}}>Hoi, {this.props.nameRe} je score is {this.props.scoreRe}</strong>
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

    

