import { combineReducers } from 'redux';

import {
    NAME,
    ADD_SCORE,
    DECREASE_LIFE,
    RESULT 
} from "../actions/action";

const initialState = {
    //name Re gets taken out of here and shown in the result screen
    nameRe: '',
    scoreRe: 0,
    result: [],
    lives: 5
}

function scoreReducer(state = initialState, action) {
    console.log(action)
    switch (action.type) {
        case NAME:
            return Object.assign({}, state,
                {
                    nameRe: action.payload
                });

        case ADD_SCORE:
            return Object.assign({}, state,
                {
                    scoreRe: action.payload
                    //unsure if lives have to be here
                })

        case DECREASE_LIFE:
            return Object.assign({}, state,
                {
                    decreaseLife: action.payload
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