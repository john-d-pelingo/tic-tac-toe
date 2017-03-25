/* eslint-disable jsx-a11y/no-static-element-interactions */

import React from 'react';

const propTypes = {
    currentPlayer: React.PropTypes.string.isRequired,
    play: React.PropTypes.func.isRequired
};

const Square = ({ currentPlayer, play }) => (
    <div className="symbol square" onClick={ () => play(currentPlayer) }>
    </div>
);

Square.propTypes = propTypes;

export default Square;
