import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { CROSS, NOUGHT } from '../../core/constants';
import { scoresSelectors } from '../../core/scores';
import { gameSelectors } from '../../core/game';
import { Cross, Nought } from '../components';

const propTypes = {
  crossScore: PropTypes.number.isRequired,
  noughtScore: PropTypes.number.isRequired,
  drawScore: PropTypes.number.isRequired,
  roundEndedAsDraw: PropTypes.bool,
  winner: PropTypes.string
};

const defaultProps = {
  roundEndedAsDraw: false,
  winner: ''
};

export const Scores = ({ crossScore, noughtScore, drawScore, roundEndedAsDraw, winner }) => {
  return (
    <div className="scores">
      <div className="score -cross">
        <Cross roundEndedAsDraw={ roundEndedAsDraw } winner={ winner === CROSS } />
        <div className={ `number ${ crossScore > noughtScore ? `-breathing` : '' }` }>{ crossScore }</div>
      </div>
      <div className="score -draw">
        <span className="text">Draws:</span> <span className="number">{ drawScore }</span>
      </div>
      <div className="score -nought">
        <Nought roundEndedAsDraw={ roundEndedAsDraw } winner={ winner === NOUGHT } />
        <div className={ `number ${ noughtScore > crossScore ? `-breathing` : '' }` }>{ noughtScore }</div>
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
  gameSelectors.getRoundEndedAsDraw,
  gameSelectors.getWinner,
  (crossScore, drawScore, noughtScore, roundEndedAsDraw, winner) => ({
    crossScore,
    drawScore,
    noughtScore,
    roundEndedAsDraw,
    winner
  })
);

const ScoresContainer = connect(mapStateToProps, null)(Scores);

export default ScoresContainer;
