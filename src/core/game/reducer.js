/* eslint-disable complexity */

import { Record } from 'immutable';

import { CROSS, NOUGHT } from '../constants';

import * as actionTypes from './action-types';

export const GameState = new Record({
    draw: null,
    end: false,
    moves: 0,
    winner: null,
    winningLayout: [],
    player: CROSS
});

export function gameReducer(state = new GameState(), { payload, type }) {
    switch (type) {
        case actionTypes.FILL_SQUARE:
            return state.merge({
                moves: state.moves + 1,
                player: payload.symbol === CROSS ? NOUGHT : CROSS
            });

        case actionTypes.DECLARE_DRAW:
            return state.merge({
                'end': true,
                'draw': true
            });

        case actionTypes.DECLARE_WINNER:
            return state.merge({
                'draw': false,
                'end': true,
                'winner': payload.winner,
                'winningLayout': payload.winningLayout
            });

        case actionTypes.NEXT_ROUND:
        case actionTypes.RESTART_GAME:
            return new GameState();

        default:
            return state;
    }
}
