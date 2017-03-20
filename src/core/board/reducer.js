/* eslint-disable no-unused-vars */

import { List, Repeat } from 'immutable';

import * as actionTypes from './action-types';

export const initialState = new List(
    Repeat('', 9)
);

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
