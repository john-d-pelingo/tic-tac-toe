import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import configureStore from './core/store';
import App from './views/app';
import { Board, Message, Scores } from './views/containers';

import './index.css';

const store = configureStore();

// TODO: General styling.
// TODO: Style squares based on spotted winner.
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
