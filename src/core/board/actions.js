/* eslint-disable complexity */

import Immutable from 'immutable';

import { BOARD_SIZE, CROSS, NOUGHT, WINNING_LAYOUTS } from '../../core/constants';
import { ticTacToeSelectors } from '../tic-tac-toe';

import * as actionTypes from './action-types';
import { getLongBoard } from './selectors';

export function declareDraw() {
    return {
        type: actionTypes.DECLARE_DRAW
    };
}

export function declareWinner(winner) {
    return {
        type: actionTypes.DECLARE_WINNER,
        payload: winner
    };
}

export function fillSquare(data) {
    return {
        type: actionTypes.FILL_SQUARE,
        payload: data
    };
}

export function play(columnIndex, rowIndex, symbol) {
    return (dispatch, getState) => {
        // If the round has not ended proceed with filling the square.
        if (!ticTacToeSelectors.getRoundEnded(getState())) {
            dispatch(fillSquare({ columnIndex, rowIndex, symbol }));

            if (ticTacToeSelectors.getNumberOfMoves(getState()) > 4) {
                switch (checkBoard(getLongBoard(getState()))) {
                    case 1:
                        return dispatch(declareDraw());
                    case 2:
                        return dispatch(declareWinner(CROSS));
                    case 3:
                        return dispatch(declareWinner(NOUGHT));
                    default:
                }
            }
        }

        return 1;
    };
}

export function checkBoard(longBoard) {
    // 0: game hasn't ended yet, continue to next player.
    // 1: draw.
    // 2: cross has won.
    // 3: nought has won.
    let checkResult = 0;

    // Can use for instead of `reduce` for better performance.
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

    for (let ii = 0; ii < WINNING_LAYOUTS.length; ii++) {
        const winningLayoutSet = Immutable.Set(WINNING_LAYOUTS[ii]);

        if (crossesPositionsSet.intersect(winningLayoutSet).equals(winningLayoutSet)) {
            checkResult = 2;
            break;
        }

        if (noughtsPositionsSet.intersect(winningLayoutSet).equals(winningLayoutSet)) {
            checkResult = 3;
            break;
        }
    }

    if (crossesPositionsSet.union(noughtsPositionsSet).size === BOARD_SIZE
        && checkResult === 0) {
        checkResult = 1;
    }

    return checkResult;
}
