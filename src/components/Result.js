import React from 'react';
import PropTypes from 'prop-types';
import App from '../App';
import { error } from 'util';
import {nameAdd, addScore} from '../actions/action';
import store from '../store'
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import scoreReducer from '../reducers/reducer';
import logo from '../svg/keytoe_logo.svg'


class Result extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            scoreboard: []
        }
    }

    componentDidMount() {
        // console.log returns the nameRe from reducer
        console.log(this.props.nameRe, this.props.scoreRe) 
        let url = 'http://192.168.5.149:4000/getScoreboard';
        fetch(url)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.setState({ scoreboard: data})
            })
            
    
    }

    render() {
        return (
            <div className="grid"> 
                <div className="gridTable"><img src={logo} className="App-logo" alt="logo" />
                    {/* this.props.nameRe takes value from nameRe in reducer */}
                    {/* <strong>{this.props.nameRe}, {this.props.scoreRe}</strong>  */}
                    <table id="scoreBoard">
                            <th>RANGLIJST</th>
                        {this.state.scoreboard.map((item, index) => 
                        <tr className="rowData" key={index}>
                            <td >{item.username}</td>
                            <td >{item.date}</td>
                            <td >{item.score}</td>
                            
                        </tr>
                        )}
                    </table>
                </div>   
            </div>     
    
        )
    }
    

                   
    
}
        

    

Result.propTypes =
    {
        quizResult: PropTypes.number.isRequired
    };
            
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

    
