import React from 'react';

import { DEFAULT_COLOR, APPLE_COLOR } from '../../core/constants';

const propTypes = {
    winner: React.PropTypes.bool
};

const defaultProps = {
    winner: false
};

const style = {
    margin: '5px'
    // margin: 'calc(50% - 0.5em)'
};

const Nought = ({ winner }) => (
    <div className={ `symbol nought` }>
        <svg viewBox="0 0 56 56" className="nought" style={ style }>
            <g transform="scale(0.05125 0.05125)">
                <path d="M791.498 544.092c-1.294-129.682 105.758-191.876 110.542-194.966-60.152-88.020-153.85-100.078-187.242-101.472-79.742-8.074-155.596 46.948-196.066 46.948-40.368 0-102.818-45.754-168.952-44.552-86.916 1.292-167.058 50.538-211.812 128.38-90.304 156.698-23.126 388.84 64.89 515.926 43.008 62.204 94.292 132.076 161.626 129.58 64.842-2.588 89.362-41.958 167.756-41.958s100.428 41.958 169.050 40.67c69.774-1.296 113.982-63.398 156.692-125.796 49.39-72.168 69.726-142.038 70.924-145.626-1.548-0.706-136.060-52.236-137.408-207.134zM662.562 163.522c35.738-43.358 59.86-103.512 53.28-163.522-51.478 2.096-113.878 34.29-150.81 77.55-33.142 38.376-62.148 99.626-54.374 158.436 57.466 4.484 116.128-29.204 151.904-72.464z" fill={ winner ? APPLE_COLOR : DEFAULT_COLOR } />
            </g>
        </svg>
    </div>
);

Nought.propTypes = propTypes;
Nought.defaultProps = defaultProps;

export default Nought;
