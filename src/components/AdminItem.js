import React from 'react'
import PropTypes from 'prop-types'
import edit from '../svg/edit.svg';
import close from '../svg/close.png';
import save from '../svg/save.svg';
import previous from '../svg/previous.svg';

const AdminItem = ({ toggleEditing, item, onChange, index, onDelete, onSubmit, FormValid }) => (
    <div>
        {item.isEditing
            ?
            <div className="adminInputs">
                <form>
                    <label>Positie:</label>
                            <div>
                        <input className = "admin-item-input"
                            type='number'
                            name='position'
                            placeholder='Positie'
                            value={item.position}
                            onChange={e => onChange(e, index)}
                            required
                                />
                    </div>
                    <label>Vraag:</label>
                    <div>
                        <textarea className = "admin-item-input"
                            type='text'
                            name='question'
                            placeholder='Vraag'
                            value={item.question}
                            onChange={e => onChange(e, index)}
                            required
                                />
                    </div>
                    <label>  Antwoord:</label>
                    <div>
                        <input className="admin-item-input"
                            type='text'
                            name='answer'
                            placeholder='Antwoord'
                            value={item.answer}
                            onChange={e => onChange(e, index)}
                            required
                        />
                    </div>
                    <label> Hint:</label>
                            <div>
                        <input className = "admin-item-input"
                            type='text'
                            name='hint'
                            placeholder='Hint'
                            value={item.hint}
                            onChange={e => onChange(e,index)}
                            required
                                />
                            </div>
                            </form>
                    </div>    
            :
            <div className = "adminPageQuestions">
                <p> Positie : {item.position} <br /> <br />
                    Vraag : {item.question} <br /> <br /> 
                    Antwoord: {item.answer} <br /> <br />
                    Hint: {item.hint}
                </p>
            </div>   
        }
        <div>
            <button className="adminSave"
                type='button'
                onClick={onSubmit}>
                {item.isEditing ?
                    <img src={save} alt='close' width="21px" height="21px"></img>
                    :
                    ''
                }
            </button>
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
        position: PropTypes.number.isRequired,
        answer: PropTypes.string.isRequired,
        hint: PropTypes.string.isRequired,
    }),
    toggleEditing: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
   
}

export default AdminItem;