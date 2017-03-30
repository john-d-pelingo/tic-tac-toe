import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { CROSS, NOUGHT } from '../../core/constants';
import { scoresSelectors } from '../../core/scores';
import { ticTacToeSelectors } from '../../core/tic-tac-toe';
import { Cross, Nought } from '../components';

const propTypes = {
    crossScore: React.PropTypes.number.isRequired,
    noughtScore: React.PropTypes.number.isRequired,
    drawScore: React.PropTypes.number.isRequired,
    roundEndedAsDraw: React.PropTypes.bool,
    winner: React.PropTypes.string
};

const defaultProps = {
    roundEndedAsDraw: false,
    winner: ''
};

// TODO: Try to use higher order components for the scores.
const Scores = ({ crossScore, noughtScore, drawScore, roundEndedAsDraw, winner }) => {
    return (
        <div className="scores">
            <div className="score cross">
                <Cross roundEndedAsDraw={ roundEndedAsDraw } winner={ winner === CROSS } /> <div className={ `number ${ crossScore > noughtScore ? `breathing` : '' }` }>{ crossScore }</div>
            </div>
            <div className="score draw">
                <span className="text">Draws:</span> <span className="number">{ drawScore }</span>
            </div>
            <div className="score nought">
                <Nought roundEndedAsDraw={ roundEndedAsDraw } winner={ winner === NOUGHT } /> <div className={ `number ${ noughtScore > crossScore ? `breathing` : '' }` }>{ noughtScore }</div>
            </div>
        </div>
    );
};

Scores.propTypes = propTypes;
Scores.defaultProps = defaultProps;

const mapStateToProps = createSelector(
    scoresSelectors.getCrossScore,
    scoresSelectors.getDrawScore,
    scoresSelectors.getNoughtScore,
    ticTacToeSelectors.getRoundEndedAsDraw,
    ticTacToeSelectors.getWinner,
    (crossScore, drawScore, noughtScore, roundEndedAsDraw, winner) => ({
        crossScore,
        drawScore,
        noughtScore,
        roundEndedAsDraw,
        winner
    })
);

export default connect(mapStateToProps, null)(Scores);