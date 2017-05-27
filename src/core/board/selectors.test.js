import { List } from 'immutable';

import { CROSS, NOUGHT } from 'core/constants';

import { boardState } from './reducer';
import { getBoardAsObjAndArr, getLongBoard } from './selectors';

describe('board', () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      board: boardState
    };
  });

  describe('getBoardAsObjAndArr()', () => {
    it('should return the board as an object with arrays for each key', () => {
      const state = {
        board: initialState.board
          .set('0', List([CROSS, CROSS, '']))
          .set('1', List([CROSS, '', NOUGHT]))
          .set('2', List(['', NOUGHT, NOUGHT]))
      };
      const board = {
        '0': [CROSS, CROSS, ''],
        '1': [CROSS, '', NOUGHT],
        '2': ['', NOUGHT, NOUGHT]
      };

      const nextBoard = getBoardAsObjAndArr(state);
      expect(nextBoard).toEqual(board);
    });
  });

  describe('getBoardAsObjAndArr()', () => {
    it('should return the board as a row matrix', () => {
      const state = {
        board: initialState.board
          .set('0', List([CROSS, NOUGHT, CROSS]))
          .set('1', List([NOUGHT, CROSS, CROSS]))
          .set('2', List([NOUGHT, CROSS, NOUGHT]))
      };
      const board = [CROSS, NOUGHT, CROSS, NOUGHT, CROSS, CROSS, NOUGHT, CROSS, NOUGHT];

      const nextBoard = getLongBoard(state);
      expect(nextBoard).toEqual(board);
    });
  });
});
