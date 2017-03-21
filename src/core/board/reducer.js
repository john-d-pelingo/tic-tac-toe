/* eslint-disable no-unused-vars */

import { List, Map, Repeat } from 'immutable';

import * as actionTypes from './action-types';

export const initialState = new Map({
    0: List(Repeat('', 3)),
    1: List(Repeat('', 3)),
    2: List(Repeat('', 3))
});

export function boardReducer(state = initialState, { payload, type }) {
    switch (type) {
        case actionTypes.PLAY:
            return state;
        case actionTypes.RESTART:
            return initialState;
        default:
            return state;
    }
}
