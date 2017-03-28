export function getTicTacToe(state) {
    return state.ticTacToe;
}

export function getRoundEndedAsDraw(state) {
    return getTicTacToe(state).draw;
}

export function getRoundEnded(state) {
    return getTicTacToe(state).end;
}

export function getNumberOfMoves(state) {
    return getTicTacToe(state).moves;
}

export function getWinner(state) {
    return getTicTacToe(state).winner;
}

export function getWinningLayout(state) {
    return getTicTacToe(state).winningLayout.reduce(function (partialArray, el) {
        return [
            ...partialArray,
            el
        ];
    }, []);
}

export function getCurrentPlayer(state) {
    return getTicTacToe(state).player;
}
