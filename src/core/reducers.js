import { combineReducers } from 'redux';

import { boardReducer } from './board';
import { scoresReducer } from './scores';
import { gameReducer } from './game';

export default combineReducers({
    board: boardReducer,
    scores: scoresReducer,
    game: gameReducer
});
