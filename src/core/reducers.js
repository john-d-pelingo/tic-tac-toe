import { combineReducers } from 'redux';

import { ticTacToeReducer } from './tic-tac-toe';
import { boardReducer } from './board';

export default combineReducers({
    board: boardReducer,
    ticTacToe: ticTacToeReducer
});
