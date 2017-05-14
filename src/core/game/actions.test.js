import configureStore from 'redux-mock-store';
import { List, Map, Repeat } from 'immutable';

import { CROSS } from '../../core/constants';

import { GameState } from './reducer';
import {
    declareDraw,
    declareWinner,
    nextRound,
    restartGame
} from './actions';

import {
    DECLARE_DRAW,
    DECLARE_WINNER,
    NEXT_ROUND,
    RESTART_GAME
} from './action-types';

const mockStore = configureStore();

describe('Board actions', () => {
    let ø;
    let initialState;
    let store;

    beforeEach(() => {
        ø = Object.create(null);

        initialState = {
            board: new Map({
                0: List(Repeat('', 3)),
                1: List(Repeat('', 3)),
                2: List(Repeat('', 3))
            }),
            scores: {
                Android: 0,
                iOS: 0,
                draws: 0
            },
            game: new GameState()
        };

        store = mockStore(initialState);
    });

    describe('declareDraw', () => {
        it('should create DECLARE_DRAW', () => {
            const actions = [
                { type: DECLARE_DRAW }
            ];

            store.dispatch(declareDraw());
            const nextActions = store.getActions();
            expect(nextActions).toEqual(actions);
        });
    });

    describe('declareWinner', () => {
        it('should create DECLARE_WINNER', () => {
            const actions = [
                {
                    type: DECLARE_WINNER,
                    payload: {
                        winner: CROSS,
                        winningLayout: [2, 5, 8]
                    }
                }
            ];

            store.dispatch(declareWinner.call(ø, CROSS, [2, 5, 8]));
            const nextActions = store.getActions();
            expect(nextActions).toEqual(actions);
        });
    });

    describe('nextRound', () => {
        it('should create NEXT_ROUND', () => {
            const actions = [
                { type: NEXT_ROUND }
            ];

            store.dispatch(nextRound());
            const nextActions = store.getActions();
            expect(nextActions).toEqual(actions);
        });
    });

    describe('restartGame', () => {
        it('should create RESTART_GAME', () => {
            const actions = [
                { type: RESTART_GAME }
            ];

            store.dispatch(restartGame());
            const nextActions = store.getActions();
            expect(nextActions).toEqual(actions);
        });
    });
});
