import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    messageSpan: PropTypes.string.isRequired,

    handleNextRoundClick: PropTypes.func.isRequired,
    handleRestartGameCLick: PropTypes.func.isRequired
};

const MessageText = ({ handleNextRoundClick, handleRestartGameCLick, messageSpan }) => (
    <div className="message-text">
        <span className="text">{ messageSpan }</span>

        <div className="button-wrapper clearfix">
            &nbsp;<a href="" onClick={ handleNextRoundClick } className="button next-game">Next round</a>
            &nbsp;<a href="" onClick={ handleRestartGameCLick } className="button new-game">New game</a>
        </div>
    </div>
);

MessageText.propTypes = propTypes;

export default MessageText;
