/* eslint-disable
 react/no-array-index-key,
 react/jsx-no-bind
 */

import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { Cross, Nought, Square } from '../components';
import { ticTacToeSelectors } from '../../core/tic-tac-toe';
import { boardActions, boardSelectors } from '../../core/board';
import { CROSS, NOUGHT } from '../../core/constants';

const propTypes = {
    board: React.PropTypes.object.isRequired,
    currentPlayer: React.PropTypes.string.isRequired,
    roundEnded: React.PropTypes.bool.isRequired,
    winner: React.PropTypes.string,
    winningLayout: React.PropTypes.array.isRequired,

    play: React.PropTypes.func.isRequired
};

const defaultProps = {
    winner: ''
};

// TODO: Try to use higher order components for the squares.
class Board extends React.Component {
    render() {
        const renderRows = () => {
            const { board, play, currentPlayer, roundEnded, winner, winningLayout } = this.props;

            return Object.keys(board).map((rowIndex, index) => {
                return (
                    <div className={ `row row-${ rowIndex }` } key={ index }>
                        {
                            board[rowIndex].map((symbol, columnIndex) => {
                                switch (symbol) {
                                    case CROSS:
                                        return (<Cross key={ columnIndex } winner={ winner === symbol && winningLayout.includes(((rowIndex * 3) + columnIndex)) } />);
                                    case NOUGHT:
                                        return (<Nought key={ columnIndex } winner={ winner === symbol && winningLayout.includes(((rowIndex * 3) + columnIndex)) } />);
                                    default:
                                        return (<Square key={ columnIndex } play={ roundEnded ? () => {} : play.bind(null, columnIndex, rowIndex) } currentPlayer={ currentPlayer } />);
                                }
                            })
                        }
                    </div>
                );
            });
        };

        return (
            <div className="board">
                { renderRows() }
            </div>
        );
    }
}

Board.propTypes = propTypes;
Board.defaultProps = defaultProps;

const mapStateToProps = createSelector(
    boardSelectors.getBoardAsObjAndArr,
    ticTacToeSelectors.getCurrentPlayer,
    ticTacToeSelectors.getRoundEnded,
    ticTacToeSelectors.getWinner,
    ticTacToeSelectors.getWinningLayout,
    (board, currentPlayer, roundEnded, winner, winningLayout) => ({
        board, currentPlayer, roundEnded, winner, winningLayout
    })
);

const mapDispatchToProps = {
    play: boardActions.play
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
