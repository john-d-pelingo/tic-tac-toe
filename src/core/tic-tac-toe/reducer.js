/* eslint-disable no-unused-vars */

import { Map } from 'immutable';

import * as actionTypes from './action-types';

export const initialState = new Map({
    draw: null,
    turn: 0,
    won: null
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
