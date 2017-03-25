/* eslint-disable complexity */

import { Record } from 'immutable';

import { CROSS, NOUGHT } from '../constants';

import * as actionTypes from './action-types';

export const TicTacToeState = new Record({
    draw: false,
    end: false,
    moves: 0,
    winner: null,
    player: CROSS
});

export function ticTacToeReducer(state = new TicTacToeState(), { payload, type }) {
    switch (type) {
        case actionTypes.FILL_SQUARE:
            return state.merge({
                moves: state.moves + 1,
                player: payload.symbol === CROSS ? NOUGHT : CROSS
            });

        case actionTypes.DECLARE_DRAW:
            return state.set('draw', true);
        case actionTypes.DECLARE_WINNER:
            return state.merge({
                'end': true,
                'winner': payload
            });

        case actionTypes.NEXT_ROUND:
        case actionTypes.RESTART_GAME:
            return new TicTacToeState();

        default:
            return state;
    }
}
