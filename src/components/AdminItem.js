import React from 'react'
import PropTypes from 'prop-types'
import FormErrors from './FormErrors'
import edit from '../svg/edit.svg';
import close from '../svg/close.png';
import previous from '../svg/previous.svg';

const AdminItem = ({ toggleEditing, item, onChange, index, onDelete, onSubmit, FormValid, errors }) => (

    <div>

        {item.isEditing
            ?
            <div className = "adminInputs">
                <FormErrors formErrors={errors} />
                <form>
                        {/* <input  */}
                        
                            {/* <div>
                                id: 
                        <input
                            type='number'
                            name='id'
                            placeholder='id'
                            value={item.id}
                            onChange={e => onChange(e, index)}
                            disabled
                                />
                            </div> */}
                            <div>
                                position:
                        <input className = "positionInput"
                            type='text'
                            name='position'
                            placeholder='position'
                            value={item.position}
                            onChange={e => onChange(e, index)}
                                />
                            </div>
                            <div>
                                vraag:
                        <input className = "vraagInput"
                            type='text'
                            name='question'
                            placeholder='question'
                            value={item.question}
                            onChange={e => onChange(e, index)}
                            required
                                />
                            </div>
                            <div>
                                hint:
                        <input className = "hintInput"
                            type='text'
                            name='hint'
                            placeholder='hint'
                            value={item.hint}
                            onChange={e => onChange(e,index)}
                            required
                                />
                            </div>
                            <div>
                                antwoord:
                        <input className="answerInput"
                            type='text'
                            name='answer'
                            placeholder='answer'
                            value={item.answer}
                            onChange={e => onChange(e, index)}
                            required
                                />
                                </div>
                            <input className = "goButAdmin" type='button' value='Update database' onClick={onSubmit}/>
                            </form>
                    </div>    
            :
            <div className = "adminPageQuestions">
                {/* TODO <br /> x 2 is unorthodox */}
                <p>Position : {item.position} <br /> <br />
                    Vraag {item.id}. {item.question} <br /> <br /> 
                    Antwoord: {item.answer} <br /> <br />
                    Hint: {item.hint}
                </p>
                
                {/* the below must appear upon button press */}
                {/* <p>hint:{item.hint}</p>     
                <p>antwoord:{item.answer}</p>    */}
            </div>   
        }
        <div>
            <button className = "adminEdit"
                type='button'
                onClick={toggleEditing}
                    >
                {item.isEditing ? <img src={previous} alt='vorige'width= "21px" height="21px"></img> : <img src= {edit} alt='Edit'></img>}
            </button>

            <button className = "adminDelete"
                type='button'
                onClick={onDelete}>
                <img src={close} alt='close' width= "21px" height="21px"></img>
                </button>
            <hr />
        </div> 
    </div>)

AdminItem.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.number.isRequired,
        position: PropTypes.string.isRequired,
        answer: PropTypes.string.isRequired,
        hint: PropTypes.string.isRequired,
    }),
    toggleEditing: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
   
}

export default AdminItem;