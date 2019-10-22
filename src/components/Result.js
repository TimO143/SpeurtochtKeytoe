import React from 'react';
import {nameAdd, addScore} from '../actions/action';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import URL from './constant'
import Welkom from '../components/Welkom'
import ReactDOM from 'react-dom'
import { Provider } from "react-redux";
import store from '../store'


class Result extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            scoreboard: []
        }
    }

    componentDidMount() {
        document.body.style.backgroundColor = 'black'
        // console.log returns the nameRe from reducer
        console.log(this.props.nameRe, this.props.scoreRe) 
        let url = URL+'/getScoreboard';
        fetch(url)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.setState({ scoreboard: data})
            })
    }
    renderWelkom() {
        ReactDOM.render(
            <Provider store={store}>
                <Welkom />;
            </Provider>,
            document.getElementById('root')
        );
    }

    render() {
        return (
            <div className="grid"> 

                <div className="gridTable">
                    {/* this.props.nameRe takes value from nameRe in reducer */}
                    {/* <strong>{this.props.nameRe}, {this.props.scoreRe}</strong>  */}
                    <p className='scoreboardName'>
                    <button className="goButAdminPanel" onClick={e => { e.preventDefault(); this.renderWelkom() }}> {'<'} </button>
                        RANGLIJST</p>
                    <table id="scoreBoard">
                        <tbody>
                        {this.state.scoreboard.map((item, index) => 
                        <tr className="rowData" key={index}>
                            <td >{item.username}</td>
                            <td >{item.date}</td>
                            <td style={{textAlign:'right'}}>{item.score}</td>
                            
                        </tr>
                        )}
                        </tbody>
                    </table>
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
    )(Result);

    
