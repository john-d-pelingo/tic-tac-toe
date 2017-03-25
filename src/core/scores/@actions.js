/* eslint-disable import/prefer-default-export */

import * as actionTypes from './action-types';

export function updateScores(newScores) {
    return {
        type: actionTypes.UPDATE_SCORES,
        payload: newScores
    };
}
