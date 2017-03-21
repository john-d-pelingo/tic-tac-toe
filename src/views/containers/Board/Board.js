/* eslint-disable react/prefer-stateless-function */
import React from 'react';

import {
    Cross,
    Nought,
    Square
} from '../../components';

import './style.css';

const propTypes = {};

class Board extends React.Component {
    render() {
        return (
            <div className="Board">
                <Square />
                <Cross />
                <Nought />
            </div>
        );
    }
}

Board.propTypes = propTypes;

export default Board;
