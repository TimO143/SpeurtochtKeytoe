import React from 'react'
import hintLogo from '../svg/hint.svg'


function Hint(props) {
    return (<div>
        <p className='hint'><img src={hintLogo}></img> Hint: {props.hint}</p>
        </div>);
}

export default Hint