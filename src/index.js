import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import configureStore from './core/store';
import App from './views/app';
import { Board, Message, Scores } from './views/containers';

// Base styles.
import './views/styles/index.css';

// Main App CSS.
import './views/styles/app/App.css';

// Containers CSS.
import './views/styles/containers/Board.css';
import './views/styles/containers/Scores.css';

// Components CSS.
import './views/styles/components/MessageText.css';
import './views/styles/components/Symbol.css';

const store = configureStore();

// TODO: General styling.
// TODO: Ability to add custom username.
ReactDOM.render(
    <Provider store={ store }>
        <App>
            <Message />
            <Scores />
            <Board />
        </App>
    </Provider>,
    document.getElementById('root')
);
