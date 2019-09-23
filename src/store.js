import { createStore } from "redux";
import scoreBoardReducer from "./reducers/reducer";
import {
    name,
    addScore,
    decreaseLife,
    result
} from './actions/action'

const store = createStore(
    scoreBoardReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())


console.log(store.getState())
const unsubscribe = store.subscribe(() => console.log(store.getState()))

store.dispatch(name('BrankoReducer'))
store.dispatch(addScore(10))
store.dispatch(result({name, addScore}))



unsubscribe()

export default createStore(scoreBoardReducer);