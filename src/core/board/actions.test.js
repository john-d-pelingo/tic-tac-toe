import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { List, Map } from 'immutable';

import { CROSS, NOUGHT } from '../../core/constants';

import { boardState } from './reducer';
import {
    fillSquare,
    play,
    checkBoard
} from './actions';

import {
    DECLARE_DRAW,
    DECLARE_WINNER,
    FILL_SQUARE
} from './action-types';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Board actions', () => {
    let ø;
    let initialState;
    let store;

    beforeEach(() => {
        ø = Object.create(null);

        initialState = {
            board: boardState,
            scores: {
                Android: 0,
                iOS: 0,
                draws: 0
            },
            game: {
                draw: null,
                end: false,
                moves: 0,
                winner: null,
                winningLayout: [],
                player: CROSS
            }
        };

        store = mockStore(initialState);
    });

    describe('fillSquare', () => {
        it('should create FILL_SQUARE', () => {
            const action = [
                { type: FILL_SQUARE }
            ];

            store.dispatch(fillSquare());
            const actions = store.getActions();
            expect(actions).toEqual(action);
        });
    });

    describe('play', () => {
        it('should not create any action when the round has ended', () => {
            const state = {
                ...initialState,
                board: new Map({
                    0: List([NOUGHT, CROSS, NOUGHT]),
                    1: List([CROSS, NOUGHT, CROSS]),
                    2: List([CROSS, NOUGHT, CROSS])
                }),
                game: {
                    ...initialState.game,
                    end: true,
                    moves: 9,
                    player: NOUGHT
                }
            };
            store = mockStore(state);
            const action = [];

            store.dispatch(play.call(ø, 0, 1));
            const actions = store.getActions();
            expect(actions).toEqual(action);
        });

        it('should create FILL_SQUARE', () => {
            const state = {
                ...initialState,
                board: new Map({
                    0: List([CROSS, CROSS, NOUGHT]),
                    1: List(['', NOUGHT, '']),
                    2: List([CROSS, '', ''])
                }),
                game: {
                    ...initialState.game,
                    moves: 5,
                    player: NOUGHT
                }
            };
            store = mockStore(state);
            const action = [
                {
                    type: FILL_SQUARE,
                    payload: {
                        columnIndex: 2,
                        rowIndex: 2,
                        symbol: NOUGHT
                    }
                }
            ];

            store.dispatch(play.call(ø, 2, 2));
            const actions = store.getActions();
            expect(actions).toEqual(action);
        });

        it('should create FILL_SQUARE', () => {
            const state = {
                ...initialState,
                board: new Map({
                    0: List([NOUGHT, CROSS, NOUGHT]),
                    1: List(['', NOUGHT, CROSS]),
                    2: List([CROSS, NOUGHT, CROSS])
                }),
                game: {
                    ...initialState.game,
                    moves: 8
                }
            };
            store = mockStore(state);
            const action = [
                {
                    type: FILL_SQUARE,
                    payload: {
                        columnIndex: 0,
                        rowIndex: 1,
                        symbol: CROSS
                    }
                }
            ];

            store.dispatch(play.call(ø, 0, 1));
            const actions = store.getActions();
            expect(actions).toEqual(action);
        });

        it('should create FILL_SQUARE and DECLARE_DRAW', () => {
            const state = {
                ...initialState,
                board: new Map({
                    0: List([NOUGHT, CROSS, NOUGHT]),
                    1: List([CROSS, NOUGHT, CROSS]),
                    2: List([CROSS, NOUGHT, CROSS])
                }),
                game: {
                    ...initialState.game,
                    moves: 9,
                    player: NOUGHT
                }
            };
            store = mockStore(state);
            const nextActions = [
                {
                    type: FILL_SQUARE,
                    payload: {
                        columnIndex: 0,
                        rowIndex: 1,
                        symbol: NOUGHT
                    }
                },
                { type: DECLARE_DRAW }
            ];

            store.dispatch(play.call(ø, 0, 1));
            const actions = store.getActions();
            expect(actions).toEqual(nextActions);
        });

        it(`should create FILL_SQUARE and DECLARE_WINNER for ${ CROSS }`, () => {
            const state = {
                ...initialState,
                board: new Map({
                    0: List([CROSS, NOUGHT, '']),
                    1: List([CROSS, CROSS, CROSS]),
                    2: List([NOUGHT, '', NOUGHT])
                }),
                game: {
                    ...initialState.game,
                    moves: 7,
                    player: CROSS
                }
            };
            store = mockStore(state);
            const nextActions = [
                {
                    type: FILL_SQUARE,
                    payload: {
                        columnIndex: 2,
                        rowIndex: 1,
                        symbol: CROSS
                    }
                },
                {
                    type: DECLARE_WINNER,
                    payload: {
                        winner: CROSS,
                        winningLayout: [3, 4, 5]
                    }
                }
            ];

            store.dispatch(play.call(ø, 2, 1));
            const actions = store.getActions();
            expect(actions).toEqual(nextActions);
        });

        it(`should create FILL_SQUARE and DECLARE_WINNER for ${ NOUGHT }`, () => {
            const state = {
                ...initialState,
                board: new Map({
                    0: List([CROSS, '', NOUGHT]),
                    1: List([CROSS, NOUGHT, CROSS]),
                    2: List([NOUGHT, '', ''])
                }),
                game: {
                    ...initialState.game,
                    moves: 6,
                    player: NOUGHT
                }
            };
            store = mockStore(state);
            const nextActions = [
                {
                    type: FILL_SQUARE,
                    payload: {
                        columnIndex: 2,
                        rowIndex: 0,
                        symbol: NOUGHT
                    }
                },
                {
                    type: DECLARE_WINNER,
                    payload: {
                        winner: NOUGHT,
                        winningLayout: [2, 4, 6]
                    }
                }
            ];

            store.dispatch(play.call(ø, 2, 0));
            const actions = store.getActions();
            expect(actions).toEqual(nextActions);
        });
    });

    describe('checkBoard', () => {
        it('should indicate that the board is not full and no one has won', () => {
            const longBoard = [];
            longBoard[0] = ['', '', '', '', '', '', '', '', ''];
            longBoard[1] = [NOUGHT, CROSS, NOUGHT, CROSS, NOUGHT, CROSS, '', NOUGHT, CROSS];
            const expectedResult = { result: 0, winningLayout: [] };

            const result = [];
            result[0] = checkBoard.call(ø, longBoard[0]);
            result[1] = checkBoard.call(ø, longBoard[1]);
            expect(result[0]).toEqual(expectedResult);
            expect(result[1]).toEqual(expectedResult);
        });

        it('should indicate that no one has won', () => {
            const longBoard = [NOUGHT, CROSS, NOUGHT, CROSS, NOUGHT, CROSS, CROSS, NOUGHT, CROSS];
            const expectedResult = { result: 1, winningLayout: [] };

            const result = checkBoard.call(ø, longBoard);
            expect(result).toEqual(expectedResult);
        });

        it(`should indicate that ${ CROSS } has won and the winning layout`, () => {
            const longBoard = [NOUGHT, '', CROSS, CROSS, NOUGHT, CROSS, '', NOUGHT, CROSS];
            const expectedResult = { result: 2, winningLayout: [2, 5, 8] };

            const result = checkBoard.call(ø, longBoard);
            expect(result).toEqual(expectedResult);
        });

        it(`should indicate that ${ NOUGHT } has won and the winning layout`, () => {
            const longBoard = [NOUGHT, '', CROSS, CROSS, NOUGHT, CROSS, '', '', NOUGHT];
            const expectedResult = { result: 3, winningLayout: [0, 4, 8] };

            const result = checkBoard.call(ø, longBoard);
            expect(result).toEqual(expectedResult);
        });
    });
});
