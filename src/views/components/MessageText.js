import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  messageSpan: PropTypes.string.isRequired,

  handleNextRoundClick: PropTypes.func.isRequired,
  handleNewGameClick: PropTypes.func.isRequired
};

const MessageText = ({ handleNextRoundClick, handleNewGameClick, messageSpan }) => (
  <div className="message-text">
    <span className="text">{ messageSpan }</span>

    <div className="button-wrapper _clearfix">
      &nbsp;<a href="" onClick={ handleNextRoundClick } className="button -next-round">Next round</a>
      &nbsp;<a href="" onClick={ handleNewGameClick } className="button -new-game">New game</a>
    </div>
  </div>
);

MessageText.propTypes = propTypes;

export default MessageText;
