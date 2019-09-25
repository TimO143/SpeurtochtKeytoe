import React from 'react';
import PropTypes from 'prop-types';
import App from '../App';
import { error } from 'util';
import constant from '../api/constant';
import {nameAdd} from '../actions/action';


class Result extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            score: []
        }
    }

    render() {
        return (
            <div className="resultPage">
                <strong>{this.props.name}, {this.props.quizResult}</strong> 
            </div>        
      
        )
                        }
                   
    componentDidMount() {
        let url = constant;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.setState({ score: data })
            })
    }
}

Result.propTypes =
    {
        quizResult: PropTypes.number.isRequired
    };
            
export default Result;
