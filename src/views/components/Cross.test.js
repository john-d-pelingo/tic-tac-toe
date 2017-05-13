/* eslint-disable object-shorthand */

import React from 'react';
import ReactDOM from 'react-dom';

import { DEFAULT_COLOR, ANDROID_COLOR, APPLE_COLOR } from '../../core/constants';

import Cross from './Cross';

describe('Cross component', () => {
    let defaultProps;

    beforeEach(() => {
        defaultProps = {
        };
    });

    describe('Default props', () => {
        it('renders without crashing', () => {
            const div = document.createElement('div');
            ReactDOM.render(<Cross />, div);
        });

        it('should be selectable by class ".symbol" or ".-cross"', () => {
            expect(shallow(<Cross { ...defaultProps } />).is('.symbol')).toBe(true);
            expect(shallow(<Cross { ...defaultProps } />).is('.-cross')).toBe(true);
        });

        it('should mount in a full DOM', () => {
            expect(mount(<Cross { ...defaultProps } />).find('.symbol').length).toBe(1);
            expect(mount(<Cross { ...defaultProps } />).find('.-cross').length).toBe(1);
        });

        it('should render to static HTML', () => {
            expect(render(<Cross { ...defaultProps } />).text()).toBe('');
        });

        it(`should be filled with the color ${ DEFAULT_COLOR } with the default props`, () => {
            const wrapper = shallow(<Cross { ...defaultProps } />);

            expect(wrapper.find('path').get(0).props.fill).toEqual(DEFAULT_COLOR);
            expect(wrapper.find('path').get(1).props.fill).toEqual(DEFAULT_COLOR);
        });
    });

    describe('New props', () => {
        it('should return the same prop values', () => {
            const newProps = {
                ...defaultProps,
                roundEndedAsDraw: true
            };
            const wrapper = shallow(<Cross { ...newProps } />);

            expect(wrapper.instance().props.roundEndedAsDraw).toEqual(newProps.roundEndedAsDraw);
            expect(wrapper.instance().props.winner).toEqual(false);
        });

        it(`should be filled with the color ${ APPLE_COLOR } when the round ended as draw`, () => {
            const newProps = {
                ...defaultProps,
                roundEndedAsDraw: true
            };
            const wrapper = shallow(<Cross { ...newProps } />);

            expect(wrapper.find('path').get(0).props.fill).toEqual(APPLE_COLOR);
            expect(wrapper.find('path').get(1).props.fill).toEqual(APPLE_COLOR);
        });

        it(`should be filled with the color ${ ANDROID_COLOR } when cross is the winner`, () => {
            const newProps = {
                ...defaultProps,
                winner: true
            };
            const wrapper = shallow(<Cross { ...newProps } />);

            expect(wrapper.find('path').get(0).props.fill).toEqual(ANDROID_COLOR);
            expect(wrapper.find('path').get(1).props.fill).toEqual(ANDROID_COLOR);
        });
    });
});
