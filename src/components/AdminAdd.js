import React from 'react'
import PropTypes from 'prop-types'


const AdminAdd = ({ question, hint, answer, position, onChange, onSubmit, onPost, FormValid}) => (
    <div >
        <form >
            <div>
                <input className = "goInputQuestions"
                    type='number'
                    placeholder='Positie'
                    value={position}
                    name='position'
                    onChange={onChange}
                    required
                />
            </div>
            <div>
            <input className = "goInputQuestions"
                type='text'
                placeholder='Vraag'
                value={question}
                name='question'
                    onChange={onChange}
                    required
                />
                </div>
            <div>
                <input className = "goInputQuestions"
                    type='text'
                    placeholder='Antwoord'
                    value={answer}
                    name='answer'
                    onChange={onChange}
                    required
                />
            </div>
            <div>
                <input className="goInputQuestions"
                    type='text'
                    placeholder='Hint'
                    value={hint}
                    name='hint'
                    onChange={onChange}
                    required
                />
            </div>
            <button className = "addQuestionButton" type='submit' onClick={onSubmit} disabled={!FormValid}>SAVE</button>

        </form>
    </div>)

AdminAdd.propTypes = {
    position: PropTypes.number.isRequired,
    question: PropTypes.string.isRequired,
    hint: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,

};

export default AdminAdd