import React from 'react';
import ReactDOM from 'react-dom';

import { GameState } from 'core/game';
import { ScoresState } from 'core/scores';

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
