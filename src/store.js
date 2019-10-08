import { createStore } from "redux";
import scoreReducer from "./reducers/reducer";


const store = createStore(
    scoreReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())


console.log(store.getState())
const unsubscribe = store.subscribe(() => console.log(store.getState()))

//store.dispatch(name('BrankoReducer'))
//store.dispatch(addScore(10))
//store.dispatch(result({name, addScore}))



unsubscribe()

export default createStore(scoreReducer);