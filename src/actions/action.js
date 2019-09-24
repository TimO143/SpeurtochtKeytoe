import store from '../store';

export const NAME = 'NAME'
export const ADD_SCORE = 'ADD_SCORE'
export const DECREASE_LIFE = 'DECREASE_LIFE'
export const RESULT = 'RESULT'


export const nameAdd = name => ({
    type: 'NAME',
    payload: name
});

export function addScore(score) {
    return {
        type: ADD_SCORE,
        score
    }
}

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


