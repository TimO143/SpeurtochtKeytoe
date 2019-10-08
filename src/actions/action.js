import store from '../store';

export const NAME = 'NAME'
export const ADD_SCORE = 'ADD_SCORE'
export const DECREASE_LIFE = 'DECREASE_LIFE'
export const RESULT = 'RESULT'


export const nameAdd = nameAdd => ({
    type: 'NAME',
    payload: nameAdd
});

export const addScore = addScore => ({
        type: ADD_SCORE,
        payload: addScore
});

export function decreaseLife(lives) {
    return {
        type: DECREASE_LIFE,
        lives
    }
}
export function showResult(quizResult) {
    return {
        type: RESULT,
        quizResult
    }
}


