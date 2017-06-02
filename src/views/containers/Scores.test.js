import React from 'react';
import ReactDOM from 'react-dom';

import { GameState } from 'core/game';
import { ScoresState } from 'core/scores';
import { CROSS, NOUGHT } from 'core/constants';

import { Scores, mapStateToProps } from './Scores';

describe('Scores container', () => {
  let defaultProps;

  beforeEach(() => {
    defaultProps = {
      crossScore: 0,
      noughtScore: 0,
      drawScore: 0,
      roundEndedAsDraw: false,
      winner: ''
    };
  });

  describe('Default props', () => {
    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<Scores { ...defaultProps } />, div);
    });

    it('should be selectable by class ".scores"', () => {
      expect(shallow(<Scores { ...defaultProps } />).is('.scores')).toBe(true);
    });

    it('should mount in a full DOM', () => {
      expect(mount(<Scores { ...defaultProps } />).find('.scores').length).toBe(1);
    });

    it('should render to static HTML', () => {
      expect(render(<Scores { ...defaultProps } />).text()).toContain('0Draws: 00');
    });
  });

  describe('New props', () => {
    it(`should display ${ CROSS }'s score with the class ".-breathing when it's winning"`, () => {
      const newProps = {
        ...defaultProps,
        crossScore: 1
      };

      expect(mount(<Scores { ...newProps } />).find('.score.-cross .number.-breathing').length).toBe(1);
      expect(mount(<Scores { ...newProps } />).find('.score.-nought .number.-breathing').length).toBe(0);
    });

    it(`should display ${ NOUGHT }'s score with the class ".-breathing when it's winning"`, () => {
      const newProps = {
        ...defaultProps,
        noughtScore: 1
      };

      expect(mount(<Scores { ...newProps } />).find('.score.-nought .number.-breathing').length).toBe(1);
      expect(mount(<Scores { ...newProps } />).find('.score.-cross .number.-breathing').length).toBe(0);
    });
  });
});

describe('Scores selector', () => {
  it('returns the correct object', () => {
    const gameState = new GameState();
    const scoresState = new ScoresState();
    const state = {
      game: gameState,
      scores: scoresState
    };

    expect(mapStateToProps(
      state,
      state,
      state,
      state,
      state
    )).toEqual({
      crossScore: 0,
      drawScore: 0,
      noughtScore: 0,
      roundEndedAsDraw: null,
      winner: null
    });
  });
});
