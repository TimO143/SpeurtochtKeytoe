import React from 'react'
import hintLogo from '../svg/hint.svg'


function Hint(props) {
    return (<div>
        <p className='hint'><img src={hintLogo} width='40px' alt='geen plaatje gevonden'></img> Hint: {props.hint}</p>
        </div>);
}

export default Hint