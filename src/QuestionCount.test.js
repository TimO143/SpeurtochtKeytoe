import React from 'react';
import ReactDOM from 'react-dom';
import QuestionCount from './components/QuestionCount';


it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<QuestionCount/>, div);
    ReactDOM.unmountComponentAtNode(div);
});
