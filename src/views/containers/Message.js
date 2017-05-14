import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { gameActions, gameSelectors } from '../../core/game';

import { MessageText } from '../components';

const propTypes = {
    roundEndedAsDraw: PropTypes.bool,
    currentPlayer: PropTypes.string.isRequired,
    winner: PropTypes.string,

    nextRound: PropTypes.func.isRequired,
    restartGame: PropTypes.func.isRequired
};

const defaultProps = {
    roundEndedAsDraw: 'false',
    winner: ''
};

export class Message extends React.Component {
    constructor(props) {
        super(props);

        this.handleNextRoundClick = this.handleNextRoundClick.bind(this);
        this.handleNewGameClick = this.handleNewGameClick.bind(this);
    }

    handleNextRoundClick(e) {
        e.preventDefault();
        return this.props.nextRound();
    }

    handleNewGameClick(e) {
        e.preventDefault();
        return this.props.restartGame();
    }

    render() {
        // eslint-disable-next-line
        const { nextRound, restartGame, roundEndedAsDraw, winner, ...restMessageProps } = this.props;

        const handleNextRoundClick = this.handleNextRoundClick;
        const handleNewGameClick = this.handleNewGameClick;

        const toSpread = {
            messageSpan: `It\u0027s ${ restMessageProps.currentPlayer }\u0027s turn.`,
            handleNextRoundClick,
            handleNewGameClick,
            ...restMessageProps
        };

        if (roundEndedAsDraw) {
            toSpread.messageSpan = 'Draw!';
        }

        if (winner) {
            toSpread.messageSpan = `${ winner } won this round!`;
        }

        return (
            <MessageText { ...toSpread } />
        );
    }
}

Message.propTypes = propTypes;
Message.defaultProps = defaultProps;

const mapStateToProps = createSelector(
    gameSelectors.getRoundEndedAsDraw,
    gameSelectors.getCurrentPlayer,
    gameSelectors.getWinner,
    (roundEndedAsDraw, currentPlayer, winner) => ({
        roundEndedAsDraw,
        currentPlayer,
        winner
    })
);

const mapDispatchToProps = dispatch => bindActionCreators({
    nextRound: gameActions.nextRound,
    restartGame: gameActions.restartGame
}, dispatch);

// Or simply:
// const mapDispatchToProps = {
//     nextRound: gameActions.nextRound,
//     restartGame: gameActions.restartGame
// };

// To connect the dispatch method to the component's props though unnecessary:
// function mapDispatchToProps(dispatch)  {
//     return {
//         ...bindActionCreators({
//             nextRound: gameActions.nextRound,
//             restartGame: gameActions.restartGame
//         }),
//         dispatch
//     };
// }

const MessageContainer = connect(mapStateToProps, mapDispatchToProps)(Message);

export default MessageContainer;
