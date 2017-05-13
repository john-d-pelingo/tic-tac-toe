/* eslint-disable object-shorthand */

import React from 'react';
import ReactDOM from 'react-dom';

import { DEFAULT_COLOR, ANDROID_COLOR, APPLE_COLOR } from '../../core/constants';

import Nought from './Nought';

describe('Nought component', () => {
    let defaultProps;

    beforeEach(() => {
        defaultProps = {
        };
    });

    describe('Default props', () => {
        it('renders without crashing', () => {
            const div = document.createElement('div');
            ReactDOM.render(<Nought />, div);
        });

        it('should be selectable by class ".symbol" or ".-nought"', () => {
            expect(shallow(<Nought { ...defaultProps } />).is('.symbol')).toBe(true);
            expect(shallow(<Nought { ...defaultProps } />).is('.-nought')).toBe(true);
        });

        it('should mount in a full DOM', () => {
            expect(mount(<Nought { ...defaultProps } />).find('.symbol').length).toBe(1);
            expect(mount(<Nought { ...defaultProps } />).find('.-nought').length).toBe(1);
        });

        it('should render to static HTML', () => {
            expect(render(<Nought { ...defaultProps } />).text()).toBe('');
        });

        it(`should be filled with the color ${ DEFAULT_COLOR } with the default props`, () => {
            expect(shallow(<Nought { ...defaultProps } />).find('path').props().fill).toEqual(DEFAULT_COLOR);
        });
    });

    describe('New props', () => {
        it('should return the same prop values', () => {
            const newProps = {
                ...defaultProps,
                roundEndedAsDraw: true
            };
            const wrapper = shallow(<Nought { ...newProps } />);

            expect(wrapper.instance().props.roundEndedAsDraw).toEqual(newProps.roundEndedAsDraw);
            expect(wrapper.instance().props.winner).toEqual(false);
        });

        it(`should be filled with the color ${ ANDROID_COLOR } when the round ended as draw`, () => {
            const newProps = {
                ...defaultProps,
                roundEndedAsDraw: true
            };
            
            expect(shallow(<Nought { ...newProps } />).find('path').props().fill).toEqual(ANDROID_COLOR);
        });

        it(`should be filled with the color ${ APPLE_COLOR } when cross is the winner`, () => {
            const newProps = {
                ...defaultProps,
                winner: true
            };
            
            expect(shallow(<Nought { ...newProps } />).find('path').props().fill).toEqual(APPLE_COLOR);
        });
    });
});
