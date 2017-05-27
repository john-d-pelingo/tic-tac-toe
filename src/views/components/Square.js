/* eslint-disable jsx-a11y/no-static-element-interactions */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  columnIndex: PropTypes.number.isRequired,
  rowIndex: PropTypes.number.isRequired,

  handleSquareClick: PropTypes.func.isRequired
};

class Square extends React.Component {
  constructor(props) {
    super(props);

    this._handleSquareClick = this._handleSquareClick.bind(this);
  }

  _handleSquareClick() {
    const { columnIndex, rowIndex, handleSquareClick } = this.props;
    return handleSquareClick(columnIndex, rowIndex);
  }

  render() {
    return (
      <div className="symbol -square" onClick={ this._handleSquareClick }>
      </div>
    );
  }
}

Square.propTypes = propTypes;

export default Square;
