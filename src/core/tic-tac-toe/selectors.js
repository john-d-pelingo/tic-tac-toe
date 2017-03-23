export function getTicTacToe(state) {
    return state.ticTacToe;
}

export function getRoundHasEnded(state) {
    return getTicTacToe(state).end;
}

export function getNumberOfMoves(state) {
    return getTicTacToe(state).moves;
}

export function getCurrentPlayer(state) {
    return getTicTacToe(state).player;
}
