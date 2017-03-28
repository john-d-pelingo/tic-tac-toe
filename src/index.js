import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import configureStore from './core/store';
import App from './views/app';
import { Board, Message, Scores } from './views/containers';

// Base styles.
import './styles/index.css';

// Main App CSS.
import './styles/app/App.css';

// Containers CSS.
import './styles/containers/Board.css';
import './styles/containers/Scores.css';

// Components CSS.
import './styles/components/MessageText.css';

const store = configureStore();

// TODO: General styling.
// TODO: Style squares based on spotted winner.
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
