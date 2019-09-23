import React from 'react';
import PropTypes from 'prop-types';
import App from '../App';
import { error } from 'util';
import constant from '../api/constant';

class Result extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            score: []
        }
    }

    render() {
        return (
            <div className="resultPage">
                {this.state.score.map(({ username, score }) =>
                    <div key={username}>
                        <div>{username},{score}</div>
                    </div>
                )}   
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
