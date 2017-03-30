import React from 'react';

const propTypes = {
    messageSpan: React.PropTypes.string.isRequired,

    handleNextRoundClick: React.PropTypes.func.isRequired,
    handleRestartGameCLick: React.PropTypes.func.isRequired
};

const MessageText = ({ handleNextRoundClick, handleRestartGameCLick, messageSpan }) => (
    <div className="message">
        <span className="text">{ messageSpan }</span>

        <div className="button-wrapper clearfix">
            &nbsp;<a href="" onClick={ handleNextRoundClick } className="button next-game">Next round</a>
            &nbsp;<a href="" onClick={ handleRestartGameCLick } className="button new-game">New game</a>
        </div>
    </div>
);

MessageText.propTypes = propTypes;

export default MessageText;
