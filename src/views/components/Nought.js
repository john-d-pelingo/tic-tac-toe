import React from 'react';

const propTypes = {};

const Nought = () => (
    <div className={ `symbol nought--o column` }>
        <svg viewBox="0 0 56 56">
            <circle cx={ 28 } cy={ 28 } r={ 25 } stroke="black" strokeWidth="2" fill="none" />
        </svg>
    </div>
);

Nought.propTypes = propTypes;

export default Nought;
