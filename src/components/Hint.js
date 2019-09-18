import React from 'react'
import quizQuestions from '../api/quizQuestions';


function Hint(props) {
    return <p className='hint'>{quizQuestions[props.counter].hint}</p>;
}

export default Hint