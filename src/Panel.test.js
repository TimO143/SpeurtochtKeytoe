import React from 'react';
import ReactDOM from 'react-dom';
import Panel from './components/Panel';
import { Provider } from "react-redux";
import store from "./store";

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Panel />, div);
    ReactDOM.unmountComponentAtNode(div);
});
