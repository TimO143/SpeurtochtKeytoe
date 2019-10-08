import React from 'react'
import PropTypes from 'prop-types'
import FormErrors from './FormErrors'

const AdminItem = ({ toggleEditing, item, onChange, index, onDelete, onSubmit, FormValid, errors }) => (
    <div>
        <div>
            <div>
                {item.isEditing
                    ?
                    <div>
                        <FormErrors formErrors={errors} />
                        <form>
                            <div>
                                id: 
                        <input
                            type='number'
                            name='id'
                            placeholder='id'
                            value={item.id}
                            onChange={e => onChange(e, index)}
                            disabled
                                />
                            </div>
                            <div>
                                position:
                        <input
                            type='text'
                            name='position'
                            placeholder='position'
                            value={item.position}
                            onChange={e => onChange(e, index)}
                                />
                            </div>
                            <div>
                                vraag:
                        <input
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
                        <input
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
                        <input
                            type='text'
                            name='answer'
                            placeholder='answer'
                            value={item.answer}
                            onChange={e => onChange(e, index)}
                            required
                                />
                                </div>
                            <input type='button' value='Update database' onClick={onSubmit}/>
                            </form>
                    </div>
                    :
                    <div>
                        <p>id:{item.id}</p>
                        <p>position:{item.position}</p>
                        <p>vraag:{item.question}</p> 
                        <p>hint:{item.hint}</p>     
                        <p>antwoord:{item.answer}</p>   
                    </div>
                }

                <div>
                    <div>
                        <button
                            type='button'
                            onClick={toggleEditing}
                             >
                            {item.isEditing ? "Exit Edit" : "Edit"}
                        </button>

                        <button
                            type='button'
                            onClick={onDelete}>
                            Delete
                         </button>
                        
                    </div>
                </div>
            </div>
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