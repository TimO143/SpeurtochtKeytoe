import React from 'react'
import quizQuestions from '../api/quizQuestions';


function Hint(props) {
    return <h2>{quizQuestions[props.counter].hint}</h2>;
}

export default Hint