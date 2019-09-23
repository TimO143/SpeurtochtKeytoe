import { combineReducers } from 'redux';

import {
    NAME,
    ADD_SCORE,
    DECREASE_LIFE,
    RESULT 
} from "../actions/action";

const initialState = {
    name: '',
    score: 0,
    result: [],
    lives: 5
}

function scoreReducer(state = initialState, action) {
    switch (action.type) {
        case NAME:
            return Object.assign({}, state,
                {
                    name: action.name
                });

        case ADD_SCORE:
            return Object.assign({}, state,
                {
                    score: action.score
                    //unsure if lives have to be here
                })

        case DECREASE_LIFE:
            return Object.assign({}, state,
                {
                    decreaseLife: action.lives
                })

        case RESULT:
            return Object.assign({}, state,
                {
                    name: state.name,
                    result: [
                        state.name,
                        state.score
                    ]
                })
        default:
            return state;
    }
}    

const scoreBoardReducer = combineReducers({
    scoreReducer
})

export default scoreBoardReducer;


//name input
//score dependent on lives
//score and name passed to quizresult
//loaded on scoreboard
//result takes name and score