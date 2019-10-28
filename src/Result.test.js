import React from 'react';
import ReactDOM from 'react-dom';
import Result from './components/Result';
import { Provider } from "react-redux";
import store from "./store";

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Provider store={store}><Result /></Provider>, div);
    ReactDOM.unmountComponentAtNode(div);
});
