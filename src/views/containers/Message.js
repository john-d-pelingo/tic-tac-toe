import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { ticTacToeActions, ticTacToeSelectors } from '../../core/tic-tac-toe';

import { MessageText } from '../components';

const propTypes = {
    roundEndedAsDraw: React.PropTypes.bool,
    currentPlayer: React.PropTypes.string.isRequired,
    winner: React.PropTypes.string,

    nextRound: React.PropTypes.func.isRequired,
    restartGame: React.PropTypes.func.isRequired
};

const defaultProps = {
    roundEndedAsDraw: 'false',
    winner: ''
};

class Message extends React.Component {
    constructor(props) {
        super(props);

        this.handleNextRoundClick = this.handleNextRoundClick.bind(this);
        this.handleRestartGameCLick = this.handleRestartGameCLick.bind(this);
    }

    handleNextRoundClick(e) {
        e.preventDefault();
        this.props.nextRound();
    }

    handleRestartGameCLick(e) {
        e.preventDefault();
        this.props.restartGame();
    }

    render() {
        // eslint-disable-next-line
        const { nextRound, restartGame, roundEndedAsDraw, winner, ...restMessageProps } = this.props;

        const handleNextRoundClick = this.handleNextRoundClick;
        const handleRestartGameCLick = this.handleRestartGameCLick;

        const toSpread = {
            messageSpan: `It\u0027s ${ restMessageProps.currentPlayer }\u0027s turn.`,
            handleNextRoundClick,
            handleRestartGameCLick,
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
    ticTacToeSelectors.getRoundEndedAsDraw,
    ticTacToeSelectors.getCurrentPlayer,
    ticTacToeSelectors.getWinner,
    (roundEndedAsDraw, currentPlayer, winner) => ({
        roundEndedAsDraw,
        currentPlayer,
        winner
    })
);

const mapDispatchToProps = dispatch => bindActionCreators({
    nextRound: ticTacToeActions.nextRound,
    restartGame: ticTacToeActions.restartGame
}, dispatch);

// Or simply:
// const mapDispatchToProps = {
//     nextRound: ticTacToeActions.nextRound,
//     restartGame: ticTacToeActions.restartGame
// };

// To connect the dispatch method to the component's props though unnecessary:
// function mapDispatchToProps(dispatch)  {
//     return {
//         ...bindActionCreators({
//             nextRound: ticTacToeActions.nextRound,
//             restartGame: ticTacToeActions.restartGame
//         }),
//         dispatch
//     };
// }

export default connect(mapStateToProps, mapDispatchToProps)(Message);
