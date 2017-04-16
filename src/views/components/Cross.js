import React from 'react';
import PropTypes from 'prop-types';

import { DEFAULT_COLOR, ANDROID_COLOR, APPLE_COLOR } from '../../core/constants';

const propTypes = {
    winner: PropTypes.bool,
    roundEndedAsDraw: PropTypes.bool
};

const defaultProps = {
    roundEndedAsDraw: false,
    winner: false
};

const Cross = ({ roundEndedAsDraw, winner }) => {
    let fill = DEFAULT_COLOR;

    if (winner) {
        fill = ANDROID_COLOR;
    } else if (roundEndedAsDraw) {
        fill = APPLE_COLOR;
    }

    return (
        <div className="symbol cross">
            <svg viewBox="0 0 56 56">
                <g transform="scale(0.05125 0.05125)">
                    <path d="M896 384c-35.2 0-64 28.8-64 64v256c0 35.2 28.8 64 64 64s64-28.8 64-64v-256c0-35.2-28.8-64-64-64zM128 384c-35.2 0-64 28.8-64 64v256c0 35.2 28.8 64 64 64s64-28.8 64-64v-256c0-35.2-28.802-64-64-64zM224 736c0 53.020 42.98 96 96 96v0 128c0 35.2 28.8 64 64 64s64-28.8 64-64v-128h128v128c0 35.2 28.8 64 64 64s64-28.8 64-64v-128c53.020 0 96-42.98 96-96v-352h-576v352z" fill={ fill } />
                    <path d="M798.216 320.002c-9.716-87.884-59.004-163.792-129.62-209.646l32.024-64.046c7.904-15.806 1.496-35.028-14.31-42.932s-35.030-1.496-42.932 14.312l-32.142 64.286-8.35-3.316c-28.568-9.502-59.122-14.66-90.886-14.66-31.762 0-62.316 5.158-90.888 14.656l-8.348 3.316-32.142-64.282c-7.904-15.808-27.128-22.212-42.932-14.312-15.808 7.904-22.214 27.126-14.312 42.932l32.022 64.046c-70.616 45.852-119.904 121.762-129.622 209.644v32h574.222v-31.998h-1.784zM416 256c-17.674 0-32-14.328-32-32 0-17.648 14.288-31.958 31.93-31.996 0.032 0 0.062 0.002 0.094 0.002 0.018 0 0.036-0.002 0.052-0.002 17.638 0.042 31.924 14.35 31.924 31.996 0 17.672-14.326 32-32 32zM608 256c-17.674 0-32-14.328-32-32 0-17.646 14.286-31.954 31.924-31.996 0.016 0 0.034 0.002 0.050 0.002 0.032 0 0.064-0.002 0.096-0.002 17.64 0.038 31.93 14.348 31.93 31.996 0 17.672-14.326 32-32 32z" fill={ fill } />
                </g>
            </svg>
        </div>
    );
};

Cross.propTypes = propTypes;
Cross.defaultProps = defaultProps;

export default Cross;
