export function getGame(state) {
  return state.game;
}

export function getRoundEndedAsDraw(state) {
  return getGame(state).draw;
}

export function getRoundEnded(state) {
  return getGame(state).end;
}

export function getNumberOfMoves(state) {
  return getGame(state).moves;
}

export function getWinner(state) {
  return getGame(state).winner;
}

export function getWinningLayout(state) {
  return getGame(state).winningLayout;
}

export function getWinningLayoutRowMatrix(state) {
  return getWinningLayout(state).reduce(function (partialArray, el) {
    return [
      ...partialArray,
      el
    ];
  }, []);
}

export function getCurrentPlayer(state) {
  return getGame(state).player;
}
