import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from './core/store';
import App from './views/app';
import { BoardContainer, MessageContainer, ScoresContainer } from './views/containers';

// Styles.
import './views/styles/style.css';

import registerServiceWorker from './registerServiceWorker';

const store = configureStore();

ReactDOM.render(
    <Provider store={ store }>
        <App>
            <MessageContainer />
            <ScoresContainer />
            <BoardContainer />
        </App>
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
