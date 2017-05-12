/* eslint-disable
 react/jsx-no-bind
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import shortid from 'shortid';

import { Cross, Nought, Square } from '../components';
import { ticTacToeSelectors } from '../../core/tic-tac-toe';
import { boardActions, boardSelectors } from '../../core/board';
import { CROSS, NOUGHT } from '../../core/constants';

const propTypes = {
    board: PropTypes.object.isRequired,
    roundEnded: PropTypes.bool.isRequired,
    roundEndedAsDraw: PropTypes.bool,
    winner: PropTypes.string,
    winningLayout: PropTypes.array.isRequired,

    play: PropTypes.func.isRequired
};

const defaultProps = {
    roundEndedAsDraw: false,
    winner: ''
};

// TODO: Try to use higher order components for the squares.
export class Board extends React.Component {
    render() {
        const renderRows = () => {
            const { board, play, roundEnded, roundEndedAsDraw, winner, winningLayout } = this.props;

            return Object.keys(board).map(rowIndex => {
                return (
                    <div className={ `row -${ rowIndex }` } key={ shortid.generate() }>
                        {
                            board[rowIndex].map((symbol, columnIndex) => {
                                switch (symbol) {
                                    case CROSS:
                                        return (<Cross key={ shortid.generate() } roundEndedAsDraw={ roundEndedAsDraw } winner={ winner === symbol && winningLayout.includes(((rowIndex * 3) + columnIndex)) } />);
                                    case NOUGHT:
                                        return (<Nought key={ shortid.generate() } roundEndedAsDraw={ roundEndedAsDraw } winner={ winner === symbol && winningLayout.includes(((rowIndex * 3) + columnIndex)) } />);
                                    default:
                                        return (<Square key={ shortid.generate() } columnIndex={ columnIndex } rowIndex={ rowIndex / 1 } handleSquareClick={ roundEnded ? () => {} : play } />);
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
    ticTacToeSelectors.getRoundEnded,
    ticTacToeSelectors.getRoundEndedAsDraw,
    ticTacToeSelectors.getWinner,
    ticTacToeSelectors.getWinningLayout,
    (board, roundEnded, roundEndedAsDraw, winner, winningLayout) => ({
        board, roundEnded, roundEndedAsDraw, winner, winningLayout
    })
);

const mapDispatchToProps = {
    play: boardActions.play
};

const BoardContainer = connect(mapStateToProps, mapDispatchToProps)(Board);

export default BoardContainer;
