import React from 'react';
import ReactDOM from 'react-dom';
import AdminAdd from './components/AdminAdd';


it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AdminAdd />, div);
    ReactDOM.unmountComponentAtNode(div);
});
