import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Welkom from './components/Welkom'
import * as serviceWorker from './serviceWorker';
import { Provider } from "react-redux";
import store from "./store";
require('typeface-cooper-hewitt')

ReactDOM.render(
   <Provider store={store}>
       <Welkom />
   </Provider>,
   document.getElementById('root')
);

// ReactDOM.render(<Welkom />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
