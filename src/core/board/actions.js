/* eslint-disable complexity */

import Immutable from 'immutable';

import {
  BOARD_SIZE,
  CROSS,
  NOUGHT,
  WINNING_LAYOUTS,
  WINNING_LAYOUTS_KEYS,
  WINNING_LAYOUTS_LENGTH
} from 'core/constants';
import { gameActions, gameSelectors } from 'core/game';

import * as actionTypes from './action-types';
import { getLongBoard } from './selectors';

export function fillSquare(data) {
  return {
    type: actionTypes.FILL_SQUARE,
    payload: data
  };
}

export function play(columnIndex, rowIndex) {
  return (dispatch, getState) => {
    // If the round has not ended proceed with filling the square.
    if (!gameSelectors.getRoundEnded(getState())) {
      const currentPlayer = gameSelectors.getCurrentPlayer(getState());
      dispatch(fillSquare({ columnIndex, rowIndex, symbol: currentPlayer }));

      if (gameSelectors.getNumberOfMoves(getState()) > 4) {
        const check = checkBoard(getLongBoard(getState()));
        switch (check.result) {
          case 1:
            return dispatch(gameActions.declareDraw());
          case 2:
            return dispatch(gameActions.declareWinner(CROSS, check.winningLayout));
          case 3:
            return dispatch(gameActions.declareWinner(NOUGHT, check.winningLayout));
          default:
        }
      }
    }

    return {};
  };
}

export function checkBoard(longBoard) {
  // 0: Game hasn't ended yet, continue to next player.
  // 1: Draw.
  // 2: Cross has won.
  // 3: Nought has won.
  const check = {
    result: 0,
    winningLayout: []
  };

  // Can use `for` instead of `reduce` for better performance.
  const positions = longBoard.reduce(function (partialPositions, symbol, position) {
    switch (symbol) {
      case (CROSS):
        return {
          ...partialPositions,
          [CROSS]: [
            ...partialPositions[CROSS],
            position
          ]
        };
      case (NOUGHT):
        return {
          ...partialPositions,
          [NOUGHT]: [
            ...partialPositions[NOUGHT],
            position
          ]
        };
      default:
        return partialPositions;
    }
  }, { [CROSS]: [], [NOUGHT]: [] });

  const crossesPositionsSet = Immutable.Set(positions[CROSS]);
  const noughtsPositionsSet = Immutable.Set(positions[NOUGHT]);

  // `for` is better here since we don't wanna do a bunch of useless loops if we find the winner.
  for (let ii = 0; ii < WINNING_LAYOUTS_LENGTH; ii++) {
    const winningLayoutSet = Immutable.Set(WINNING_LAYOUTS[WINNING_LAYOUTS_KEYS[ii]]);

    if (crossesPositionsSet.intersect(winningLayoutSet).equals(winningLayoutSet)) {
      check.result = 2;
      check.winningLayout = WINNING_LAYOUTS[WINNING_LAYOUTS_KEYS[ii]];
      break;
    }

    if (noughtsPositionsSet.intersect(winningLayoutSet).equals(winningLayoutSet)) {
      check.result = 3;
      check.winningLayout = WINNING_LAYOUTS[WINNING_LAYOUTS_KEYS[ii]];
      break;
    }
  }

  if (crossesPositionsSet.union(noughtsPositionsSet).size === BOARD_SIZE && check.result === 0) {
    check.result = 1;
  }

  return check;
}
