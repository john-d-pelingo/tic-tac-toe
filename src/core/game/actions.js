import * as actionTypes from './action-types';

export function declareDraw() {
  return {
    type: actionTypes.DECLARE_DRAW
  };
}

export function declareWinner(winner, winningLayout) {
  return {
    type: actionTypes.DECLARE_WINNER,
    payload: {
      winner,
      winningLayout
    }
  };
}

export function nextRound() {
  return {
    type: actionTypes.NEXT_ROUND
  };
}

export function restartGame() {
  return {
    type: actionTypes.RESTART_GAME
  };
}
