/* eslint-disable no-unused-vars */

import { Map } from 'immutable';

import { CROSS } from '../constants';

import * as actionTypes from './action-types';

export const initialState = new Map({
    draw: false,
    moves: 0,
    turn: CROSS,
    won: false
});

export function ticTacToeReducer(state = initialState, { payload, type }) {
    switch (type) {
        case actionTypes.PLAY:
            return state;
        case actionTypes.RESTART:
            return initialState;
        default:
            return state;
    }
}
