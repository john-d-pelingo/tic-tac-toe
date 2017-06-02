import React from 'react';
import ReactDOM from 'react-dom';

import { Cross, Nought, Square } from 'views/components';
import { GameState } from 'core/game';
import { boardState } from 'core/board';
import { CROSS, NOUGHT } from 'core/constants';


import { Board, mapStateToProps } from './Board';

describe('Board container', () => {
  let defaultProps;

  beforeEach(() => {
    defaultProps = {
      board: {
        '0': ['', '', ''],
        '1': ['', '', ''],
        '2': ['', '', '']
      },
      roundEnded: false,
      roundEndedAsDraw: false,
      winner: '',
      winningLayoutMatrix: [],

      play: () => {}
    };
  });

  describe('Default props', () => {
    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<Board { ...defaultProps } />, div);
    });

    it('should mount in a full DOM with 9 Squares', () => {
      const wrapper = mount(<Board { ...defaultProps } />);

      expect(wrapper.find(Square).length).toBe(9);
      expect(wrapper.find(Cross).length).toBe(0);
      expect(wrapper.find(Nought).length).toBe(0);
    });

    it('should render to static HTML', () => {
      expect(render(<Board { ...defaultProps } />).text()).toEqual('');
    });
  });

  describe('New props', () => {
    it('should mount in a full DOM with the correct symbols', () => {
      const newProps = {
        ...defaultProps,
        board: {
          '0': [CROSS, NOUGHT, ''],
          '1': [CROSS, NOUGHT, ''],
          '2': ['', '', '']
        }
      };

      const wrapper = mount(<Board { ...newProps } />);
      expect(wrapper.find(Square).length).toBe(5);
      expect(wrapper.find(Cross).length).toBe(2);
      expect(wrapper.find(Nought).length).toBe(2);
    });

    it('should have correct handlers for Square symbols when round has ended', () => {
      const newProps = {
        ...defaultProps,
        board: {
          '0': [CROSS, NOUGHT, ''],
          '1': [CROSS, NOUGHT, ''],
          '2': [CROSS, '', '']
        },
        roundEnded: true,
        roundEndedAsDraw: false,
        winner: CROSS,
        winningLayoutMatrix: [0, 3, 6]
      };

      const wrapper = mount(<Board { ...newProps } />);
      for (let ii = 0; ii < 4; ii++) {
        expect(wrapper.find(Square).get(ii).props.handleSquareClick.name).toBe('');
      }
    });

    it.skip(`should show that ${ CROSS } is the winner and its 3 winner symbols while ${ NOUGHT } is not`, () => {
      const newProps = {
        ...defaultProps,
        board: {
          '0': [CROSS, NOUGHT, ''],
          '1': [CROSS, NOUGHT, ''],
          '2': [CROSS, '', '']
        },
        roundEnded: true,
        roundEndedAsDraw: false,
        winner: CROSS,
        winningLayoutMatrix: [0, 3, 6]
      };

      const wrapper = mount(<Board { ...newProps } />);
      for (let ii = 0; ii < 3; ii++) {
        expect(wrapper.find(Cross).get(ii).props.winner).toBe(true);
      }
      for (let ii = 0; ii < 2; ii++) {
        expect(wrapper.find(Nought).get(ii).props.winner).toBe(false);
      }
    });

    it.skip(`should show that ${ NOUGHT } is the winner and its 3 winner symbols while ${ CROSS } is not`, () => {
      const newProps = {
        ...defaultProps,
        board: {
          '0': [CROSS, NOUGHT, CROSS],
          '1': [CROSS, NOUGHT, NOUGHT],
          '2': ['', NOUGHT, CROSS]
        },
        roundEnded: true,
        roundEndedAsDraw: false,
        winner: NOUGHT,
        winningLayoutMatrix: [1, 4, 7]
      };

      const wrapper = mount(<Board { ...newProps } />);
      for (let ii = 0; ii < 4; ii++) {
        expect(wrapper.find(Cross).get(ii).props.winner).toBe(false);
      }

      for (let ii = 0; ii < 4; ii++) {
        expect(wrapper.find(Nought).get(ii).props.winner).toBe(true);
      }
    });
  });
});

describe('Board selector', () => {
  it('returns the correct object', () => {
    const theBoardState = boardState;
    const gameState = new GameState();
    const state = {
      board: theBoardState,
      game: gameState
    };

    expect(mapStateToProps(
      state,
      state,
      state,
      state,
      state
    )).toEqual({
      board: {
        '0': ['', '', ''],
        '1': ['', '', ''],
        '2': ['', '', '']
      },
      roundEnded: false,
      roundEndedAsDraw: null,
      winner: null,
      winningLayoutMatrix: []
    });
  });
});
