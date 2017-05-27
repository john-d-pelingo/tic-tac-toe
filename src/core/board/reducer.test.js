import { List } from 'immutable';

import { CROSS, NOUGHT } from 'core/constants';

import { boardReducer, boardState } from './reducer';
import {
  FILL_SQUARE,
  NEXT_ROUND,
  RESTART_GAME
} from './action-types';

describe('Board reducer', () => {
  let initialState;

  beforeEach(() => {
    initialState = boardState;
  });

  describe('FILL_SQUARE', () => {
    it('should fill the squares for the first 4 moves', () => {
      const state = [];
      const nextState = [];

      /* 0 */
      state[0] = initialState.set('1', initialState.get('1').set(0, CROSS));

      nextState[0] = boardReducer(initialState, {
        type: FILL_SQUARE,
        payload: {
          columnIndex: 0,
          rowIndex: 1,
          symbol: CROSS
        }
      });

      expect(nextState[0]).toEqual(state[0]);

      /* 1 */
      state[1] = state[0].set('0', state[0].get('0').set(1, NOUGHT));

      nextState[1] = boardReducer(nextState[0], {
        type: FILL_SQUARE,
        payload: {
          columnIndex: 1,
          rowIndex: 0,
          symbol: NOUGHT
        }
      });

      expect(nextState[1]).toEqual(state[1]);

      /* 2 */
      state[2] = state[1].set('2', state[1].get('2').set(2, CROSS));

      nextState[2] = boardReducer(nextState[1], {
        type: FILL_SQUARE,
        payload: {
          columnIndex: 2,
          rowIndex: 2,
          symbol: CROSS
        }
      });

      expect(nextState[2]).toEqual(state[2]);

      /* 3 */
      state[3] = state[2].set('0', state[2].get('0').set(0, NOUGHT));

      nextState[3] = boardReducer(nextState[2], {
        type: FILL_SQUARE,
        payload: {
          columnIndex: 0,
          rowIndex: 0,
          symbol: NOUGHT
        }
      });

      expect(nextState[3]).toEqual(state[3]);
    });
  });

  describe('NEXT_ROUND', () => {
    it('should reset the board', () => {
      const state = initialState
        .set('0', List([CROSS, CROSS, '']))
        .set('1', List([CROSS, '', '']))
        .set('2', List(['', NOUGHT, NOUGHT]));

      const nextState = boardReducer(state, {
        type: NEXT_ROUND,
        payload: {}
      });

      expect(nextState).toEqual(initialState);
    });
  });

  describe('RESTART_GAME', () => {
    it('should reset the board', () => {
      const state = initialState
        .set('0', List(['', '', NOUGHT]))
        .set('1', List([CROSS, '', CROSS]))
        .set('2', List(['', '', NOUGHT]));

      const nextState = boardReducer(state, {
        type: RESTART_GAME,
        payload: {}
      });

      expect(nextState).toEqual(initialState);
    });
  });
});
