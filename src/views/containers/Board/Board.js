/* eslint-disable
 react/no-array-index-key,
 react/jsx-no-bind
 */

import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { Cross, Nought, Square } from '../../components';
import { ticTacToeActions, ticTacToeSelectors } from '../../../core/tic-tac-toe';
import { getBoard } from '../../../core/board';
import { CROSS, NOUGHT } from '../../../core/constants';

import './style.css';

const propTypes = {
    board: React.PropTypes.object.isRequired,
    currentPlayer: React.PropTypes.string.isRequired,
    play: React.PropTypes.func.isRequired,
    roundHasEnded: React.PropTypes.bool.isRequired
};

class Board extends React.Component {
    render() {
        const renderRows = () => {
            const { board, play, currentPlayer, roundHasEnded } = this.props;

            return Object.keys(board).map((rowIndex, index) => {
                return (
                    <div className={ `row row-${ rowIndex }` } key={ index }>
                        {
                            board[rowIndex].map((symbol, columnIndex) => {
                                switch (symbol) {
                                    case CROSS:
                                        return (<Cross key={ columnIndex } />);
                                    case NOUGHT:
                                        return (<Nought key={ columnIndex } />);
                                    default:
                                        return (<Square key={ columnIndex } play={ roundHasEnded ? () => {} : play.bind(null, columnIndex, rowIndex) } currentPlayer={ currentPlayer } />);
                                }
                            })
                        }
                    </div>
                );
            });
        };

        return (
            <div className="Board">
                { renderRows() }
            </div>
        );
    }
}

Board.propTypes = propTypes;

const mapStateToProps = createSelector(
    ticTacToeSelectors.getCurrentPlayer,
    ticTacToeSelectors.getRoundHasEnded,
    getBoard,
    (currentPlayer, roundHasEnded, board) => ({
        currentPlayer, roundHasEnded, board
    })
);

const mapDispatchToProps = {
    play: ticTacToeActions.play
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
