/* eslint-disable no-unused-vars */

import { List, Map, Repeat } from 'immutable';

import * as actionTypes from './action-types';

export const boardState = new Map({
  0: List(Repeat('', 3)),
  1: List(Repeat('', 3)),
  2: List(Repeat('', 3))
});

export function boardReducer(state = boardState, { payload, type }) {
  switch (type) {
    case actionTypes.FILL_SQUARE:
      return state.set('' + payload.rowIndex,
        state.get('' + payload.rowIndex)
          .set(payload.columnIndex, payload.symbol)
      );

    case actionTypes.NEXT_ROUND:
    case actionTypes.RESTART_GAME:
      return boardState;

    default:
      return state;
  }
}
