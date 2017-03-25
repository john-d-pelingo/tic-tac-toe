import * as actionTypes from './action-types';
import * as selectors from './selectors';

export function fillSquare(data) {
    return {
        type: actionTypes.FILL_SQUARE,
        payload: data
    };
}

export function restart() {
    return {
        type: actionTypes.RESTART
    };
}

export function play(columnIndex, rowIndex, symbol) {
    return (dispatch, getState) => {
        const currentState = getState();

        // If the round has not ended proceed with filling the square.
        if (!selectors.getRoundHasEnded(currentState)) {
            return dispatch(fillSquare({ columnIndex, rowIndex, symbol }));
        }

        return 1;
    };
}

// TODO: Logic of winning.
// function checkBoard() {
//
// }
