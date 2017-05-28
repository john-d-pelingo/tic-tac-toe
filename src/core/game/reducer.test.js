import { CROSS, NOUGHT } from 'core/constants';

import { gameReducer, GameState } from './reducer';
import {
  DECLARE_DRAW,
  DECLARE_WINNER,
  FILL_SQUARE,
  NEXT_ROUND,
  RESTART_GAME
} from './action-types';

describe('Board reducer', () => {
  let initialState;

  beforeEach(() => {
    initialState = new GameState();
  });

  describe('DECLARE_DRAW', () => {
    it('should indicate that the game has ended and ended as a draw', () => {
      const state = initialState.merge({
        draw: true,
        end: true
      });

      const nextState = gameReducer(initialState, {
        type: DECLARE_DRAW
      });

      expect(nextState).toEqual(state);
    });
  });


  describe('DECLARE_WINNER', () => {
    it(`should indicate that the game has ended and ${ CROSS } as the winner`, () => {
      const state = initialState.merge({
        draw: false,
        end: true,
        winner: CROSS,
        winningLayout: [2, 4, 6]
      });

      const nextState = gameReducer(initialState, {
        type: DECLARE_WINNER,
        payload: {
          winner: CROSS,
          winningLayout: [2, 4, 6]
        }
      });

      expect(nextState).toEqual(state);
    });

    it(`should indicate that the game has ended and ${ NOUGHT } as the winner`, () => {
      const state = initialState.merge({
        draw: false,
        end: true,
        winner: NOUGHT,
        winningLayout: [6, 7, 8]
      });

      const nextState = gameReducer(initialState, {
        type: DECLARE_WINNER,
        payload: {
          winner: NOUGHT,
          winningLayout: [6, 7, 8]
        }
      });

      expect(nextState).toEqual(state);
    });
  });

  describe('FILL_SQUARE', () => {
    it(`should increment the moves by 1 change the current player to ${ NOUGHT }`, () => {
      const state = initialState.merge({
        moves: initialState.get('moves') + 1,
        player: NOUGHT
      });

      const nextState = gameReducer(initialState, {
        type: FILL_SQUARE,
        payload: {
          columnIndex: 1,
          rowIndex: 2,
          symbol: CROSS
        }
      });

      expect(nextState).toEqual(state);
    });

    it(`should increment the moves by 1 change the current player to ${ CROSS }`, () => {
      const state = initialState.merge({
        moves: initialState.get('moves') + 1,
        player: CROSS
      });

      const nextState = gameReducer(initialState, {
        type: FILL_SQUARE,
        payload: {
          columnIndex: 0,
          rowIndex: 0,
          symbol: NOUGHT
        }
      });

      expect(nextState).toEqual(state);
    });
  });

  describe('NEXT_ROUND', () => {
    it('should reset the game', () => {
      const state = initialState.merge({
        moves: 5,
        player: NOUGHT
      });

      const nextState = gameReducer(state, {
        type: NEXT_ROUND
      });

      expect(nextState).toEqual(initialState);
    });
  });

  describe('RESTART_GAME', () => {
    it('should reset the game', () => {
      const state = initialState.merge({
        draw: false,
        end: true,
        winner: CROSS,
        winningLayout: [3, 4, 5]
      });

      const nextState = gameReducer(state, {
        type: RESTART_GAME
      });
      expect(nextState).toEqual(initialState);
    });
  });

  describe('unknown action', () => {
    it('should return the same state', () => {
      const nextState = gameReducer(undefined, {
        type: 'MAKE_COFFEE',
        payload: {}
      });

      expect(nextState).toEqual(initialState);
    });
  });
});
