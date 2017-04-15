import * as actionTypes from './action-types';

export function restartGame() {
    return {
        type: actionTypes.RESTART_GAME
    };
}

export function nextRound() {
    return {
        type: actionTypes.NEXT_ROUND
    };
}
