/* eslint-disable object-shorthand */

import React from 'react';
import ReactDOM from 'react-dom';
import sinon from 'sinon';

import MessageText from './MessageText';

describe('MessageText component', () => {
    let defaultProps;

    beforeEach(() => {
        defaultProps = {
            messageSpan: '',

            handleNextRoundClick: function (event) {
                event.preventDefault();
                return {};
            },
            handleNewGameClick: function (event) {
                event.preventDefault();
                return {};
            }
        };
    });

    describe('Default props', () => {
        it('renders without crashing', () => {
            const div = document.createElement('div');
            ReactDOM.render(<MessageText { ...defaultProps } />, div);
        });

        it('should be selectable by class ".message-text"', () => {
            expect(shallow(<MessageText { ...defaultProps } />).is('.message-text')).toBe(true);
        });

        it('should mount in a full DOM', () => {
            expect(mount(<MessageText { ...defaultProps } />).find('.message-text').length).toBe(1);
        });

        it('should render to static HTML', () => {
            expect(render(<MessageText { ...defaultProps } />).text()).toBe(' Next round New game');
        });
    });

    describe('New props', () => {
        it('should return the same prop values', () => {
            const newProps = {
                ...defaultProps,
                messageSpan: 'Hello'
            };

            expect(shallow(<MessageText { ...newProps } />).instance().props.messageSpan).toEqual(newProps.messageSpan);
        });

        it('should render the correct text', () => {
            const newProps = {
                ...defaultProps,
                messageSpan: `It's Android's turn`
            };

            expect(render(<MessageText { ...newProps } />).text()).toContain(newProps.messageSpan);
        });
    });

    describe('Simulations', () => {
        it('should handle the next round click event', () => {
            const newProps = {
                ...defaultProps,
                handleNextRoundClick: sinon.spy()
            };

            const wrapper = mount(<MessageText { ...newProps } />);
            wrapper.find('.-next-round').simulate('click');

            expect(newProps.handleNextRoundClick.calledOnce).toBe(true);
        });

        it('should handle the new game click event', () => {
            const newProps = {
                ...defaultProps,
                handleNewGameClick: sinon.spy()
            };

            const wrapper = mount(<MessageText { ...newProps } />);
            wrapper.find('.-new-game').simulate('click');

            expect(newProps.handleNewGameClick.calledOnce).toBe(true);
        });
    });
});
