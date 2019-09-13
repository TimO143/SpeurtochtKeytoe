import React from 'react'
import quizQuestions from '../api/quizQuestions';


function Hint(props) {
    return <text className='hint'>{quizQuestions[props.counter].hint}</text>;
}

export default Hint