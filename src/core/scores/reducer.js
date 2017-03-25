import { Record } from 'immutable';

import { CROSS, NOUGHT } from '../constants';

import * as actionTypes from './action-types';

export const ScoresState = new Record({
    [CROSS]: 0,
    [NOUGHT]: 0,
    draws: 0
});

export function scoresReducer(state = new ScoresState(), { payload, type }) {
    switch (type) {
        case actionTypes.DECLARE_WINNER:
            return state.set(payload, state[payload] + 1);

        case actionTypes.DECLARE_DRAW:
            return state.set('draws', state.draws + 1);

        case actionTypes.RESTART_GAME:
            return new ScoresState();

        default:
            return state;
    }
}
