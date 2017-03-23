/* eslint-disable react/no-array-index-key */
import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import {
    Cross,
    Nought,
    Square
} from '../../components';

import {
    ticTacToeActions,
    ticTacToeSelectors
} from '../../../core/tic-tac-toe';

import {
    getBoard
} from '../../../core/board';

import {
    CROSS,
    NOUGHT
} from '../../../core/constants';

import './style.css';

const propTypes = {
    board: React.PropTypes.object.isRequired,
    play: React.PropTypes.func.isRequired,
    roundHasEnded: React.PropTypes.bool.isRequired
};

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.play = this.play.bind(this);
    }

    play(rowIndex, position, symbol) {
        if (!this.props.roundHasEnded) this.props.play(rowIndex, position, symbol);
    }

    render() {
        const renderRows = () => {
            const { board } = this.props;

            return Object.keys(board).map(function (rowIndex, index) {
                return (
                    <div className={ `row row-${ rowIndex }` } key={ index }>
                        {
                            board[rowIndex].map(function (symbol, position) {
                                switch (symbol) {
                                    case CROSS:
                                        return (<Cross key={ position } />);
                                    case NOUGHT:
                                        return (<Nought key={ position } />);
                                    default:
                                        return (<Square key={ position } />);
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
    ticTacToeSelectors.getRoundHasEnded,
    getBoard,
    (roundHasEnded, board) => ({
        roundHasEnded, board
    })
);

const mapDispatchToProps = {
    play: ticTacToeActions.play
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
