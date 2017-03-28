import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { scoresSelectors } from '../../core/scores';

const propTypes = {
    crossScore: React.PropTypes.number.isRequired,
    noughtScore: React.PropTypes.number.isRequired,
    drawScore: React.PropTypes.number.isRequired
};

// TODO: Try to use higher order components for the scores.
const Scores = ({ crossScore, noughtScore, drawScore }) => (
    <div className="scores">
        <div className="score cross">
            <span>Cross:</span> { crossScore }
        </div>
        <br />
        <div className="score nought">
            <span>Nought:</span> { noughtScore }
        </div>
        <br />
        <div className="score draw">
            <span>Draws:</span> { drawScore }
        </div>
    </div>
);

Scores.propTypes = propTypes;

const mapStateToProps = createSelector(
    scoresSelectors.getCrossScore,
    scoresSelectors.getNoughtScore,
    scoresSelectors.getDrawScore,
    (crossScore, noughtScore, drawScore) => ({
        crossScore,
        noughtScore,
        drawScore
    })
);

export default connect(mapStateToProps, null)(Scores);
