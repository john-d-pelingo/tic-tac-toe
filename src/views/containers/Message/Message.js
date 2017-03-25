import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { ticTacToeActions, ticTacToeSelectors } from '../../../core/tic-tac-toe';


const propTypes = {
    roundEndedAsDraw: React.PropTypes.bool,
    currentPlayer: React.PropTypes.string.isRequired,
    numberOfMoves: React.PropTypes.number.isRequired,
    winner: React.PropTypes.string,

    nextRound: React.PropTypes.func.isRequired,
    restartGame: React.PropTypes.func.isRequired
};

const defaultProps = {
    roundEndedAsDraw: 'false',
    winner: ''
};

// TODO: Try to use higher order components for the messages.
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
        const { roundEndedAsDraw, currentPlayer, numberOfMoves, winner } = this.props;
        if (roundEndedAsDraw) {
            return (
                <div className="message">
                    <span className="draw">Draw!</span>
                    &nbsp;<a href="" onClick={ this.handleNextRoundClick }>Next round</a>
                    &nbsp;<a href="" onClick={ this.handleRestartGameCLick }>New game</a>
                </div>
            );
        }

        if (winner) {
            return (
                <div className="message">
                    <span className="message">{ winner } won!</span>
                    &nbsp;<a href="" onClick={ this.handleNextRoundClick }>Next round</a>
                    &nbsp;<a href="" onClick={ this.handleRestartGameCLick }>New game</a>
                </div>
            );
        }

        return (
            <div className="message">
                <span className="message">It&apos;s { currentPlayer }&apos;s turn.</span>
                &nbsp;
                {
                    numberOfMoves > 0 ? (<a href="" onClick={ this.handleRestartGameCLick }>New game</a>) : null
                }
            </div>
        );
    }
}

Message.propTypes = propTypes;
Message.defaultProps = defaultProps;

const mapStateToProps = createSelector(
    ticTacToeSelectors.getRoundEndedAsDraw,
    ticTacToeSelectors.getCurrentPlayer,
    ticTacToeSelectors.getNumberOfMoves,
    ticTacToeSelectors.getWinner,
    (roundEndedAsDraw, currentPlayer, numberOfMoves, winner) => ({
        roundEndedAsDraw,
        currentPlayer,
        numberOfMoves,
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
