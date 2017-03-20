import * as actionTypes from './action-types';

export function play() {
    return {
        type: actionTypes.PLAY
    };
}

export function restart() {
    return {
        type: actionTypes.RESTART
    };
}
