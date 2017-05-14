import { CROSS, NOUGHT } from '../../core/constants';

import { scoresReducer, ScoresState } from './reducer';
import {
    DECLARE_DRAW,
    DECLARE_WINNER,
    RESTART_GAME
} from './action-types';

describe('Scores reducer', () => {
    let initialState;

    beforeEach(() => {
        initialState = new ScoresState();
    });

    describe('DECLARE_DRAW', () => {
        it('should increment draws score by 1', () => {
            const state = initialState.set('draws', initialState.get('draws') + 1);

            const nextState = scoresReducer(initialState, {
                type: DECLARE_DRAW,
                payload: {}
            });
            expect(nextState).toEqual(state);
        });
    });

    describe('DECLARE_WINNER', () => {
        it(`should increment ${ CROSS }'s score by 1`, () => {
            const state = initialState.set(CROSS, initialState.get(CROSS) + 1);

            const nextState = scoresReducer(initialState, {
                type: DECLARE_WINNER,
                payload: {
                    winner: CROSS,
                    winningLayout: [1, 4, 7]
                }
            });

            expect(nextState).toEqual(state);
        });

        it(`should increment ${ NOUGHT }'s score by 1`, () => {
            const state = initialState.set(NOUGHT, initialState.get(NOUGHT) + 1);

            const nextState = scoresReducer(initialState, {
                type: DECLARE_WINNER,
                payload: {
                    winner: NOUGHT,
                    winningLayout: [0, 1, 2]
                }
            });
            expect(nextState).toEqual(state);
        });
    });

    describe('RESTART_GAME', () => {
        it('should reset all of the scores', () => {
            const state = initialState.merge({
                [CROSS]: 2,
                [NOUGHT]: 4,
                draws: 7
            });

            const nextState = scoresReducer(state, {
                type: RESTART_GAME,
                payload: {}
            });

            expect(nextState).toEqual(initialState);
        });
    });
});
