/* eslint-disable jsx-a11y/no-static-element-interactions */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    currentPlayer: PropTypes.string.isRequired,
    play: PropTypes.func.isRequired
};

const Square = ({ currentPlayer, play }) => (
    <div className="symbol square" onClick={ () => play(currentPlayer) }>
    </div>
);

Square.propTypes = propTypes;

export default Square;
