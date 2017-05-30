import React from 'react';
import ReactDOM from 'react-dom';

import { CROSS } from 'core/constants';
import { MessageText } from 'views/components';

import { Message } from './Message';

describe('Message container', () => {
  let defaultProps;

  beforeEach(() => {
    defaultProps = {
      roundEndedAsDraw: false,
      currentPlayer: CROSS,
      winner: '',

      nextRound: () => {},
      restartGame: () => {}
    };
  });

  describe('Default props', () => {
    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<Message { ...defaultProps } />, div);
    });

    it('should mount in a full DOM with its children', () => {
      expect(mount(<Message { ...defaultProps } />).find(MessageText).length).toBe(1);
    });

    it('should render to static HTML', () => {
      const wrapper = render(<Message { ...defaultProps } />);

      expect(wrapper.text()).toContain('It\'s Android\'s turn.');
      expect(wrapper.text()).toContain('Next round');
      expect(wrapper.text()).toContain('New game');
    });
  });
});
