import React from 'react'
import PropTypes from 'prop-types'

const AdminAdd = ({ question, hint, answer, position, onChange, onSubmit, onPost, FormValid}) => (
    <div >
        <form >
            <div>
                <input
                    type='text'
                    placeholder='position'
                    value={position}
                    name='position'
                    onChange={onChange}
                    required
                />
            </div>
            <div>
            <input
                type='text'
                placeholder='question'
                value={question}
                name='question'
                    onChange={onChange}
                    required
                />
                </div>
            <div>
                <input
                    type='text'
                    placeholder='hint'
                    value={hint}
                    name='hint'
                    onChange={onChange}
                    required
                />
            </div>
            <div>
                <input
                    type='text'
                    placeholder='answer'
                    value={answer}
                    name='answer'
                    onChange={onChange}
                    required
                />
            </div>
            <button type='submit' onClick={onSubmit} disabled={!FormValid}>save</button>

        </form>
    </div>)

AdminAdd.propTypes = {
    position: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    hint: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,

};

export default AdminAdd