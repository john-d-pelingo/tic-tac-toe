/* eslint-disable no-unused-vars */

import { Record } from 'immutable';

import { CROSS } from '../constants';

import * as actionTypes from './action-types';

export const TicTacToeState = new Record({
    end: false,
    moves: 0,
    player: CROSS
});

export function ticTacToeReducer(state = new TicTacToeState(), { payload, type }) {
    switch (type) {
        case actionTypes.PLAY:
            return state;
        case actionTypes.RESTART:
            return new TicTacToeState();
        default:
            return state;
    }
}
