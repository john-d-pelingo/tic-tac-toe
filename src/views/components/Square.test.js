/* eslint-disable object-shorthand */

import React from 'react';
import ReactDOM from 'react-dom';
import sinon from 'sinon';

import Square from './Square';

describe('Square component', () => {
    let defaultProps;

    beforeEach(() => {
        defaultProps = {
            columnIndex: 0,
            rowIndex: 0,

            handleSquareClick: function () {
                return {};
            }
        };
    });

    describe('Default props', () => {
        it('renders without crashing', () => {
            const div = document.createElement('div');
            ReactDOM.render(<Square { ...defaultProps } />, div);
        });

        it('should be selectable by class ".symbol" or ".-square"', () => {
            expect(shallow(<Square { ...defaultProps } />).is('.symbol')).toBe(true);
            expect(shallow(<Square { ...defaultProps } />).is('.-square')).toBe(true);
        });

        it('should mount in a full DOM', () => {
            expect(mount(<Square { ...defaultProps } />).find('.symbol').length).toBe(1);
            expect(mount(<Square { ...defaultProps } />).find('.-square').length).toBe(1);
        });

        it('should render to static HTML', () => {
            expect(render(<Square { ...defaultProps } />).text()).toBe('');
        });
    });

    describe('New props', () => {
        it('should return the same prop values', () => {
            const newProps = {
                ...defaultProps,
                columnIndex: 1,
                rowIndex: 2
            };
            const wrapper = shallow(<Square { ...newProps } />);

            expect(wrapper.instance().props.columnIndex).toEqual(newProps.columnIndex);
            expect(wrapper.instance().props.rowIndex).toEqual(newProps.rowIndex);
        });
    });

    describe('Simulations', () => {
        it('should handle a click event', () => {
            sinon.spy(Square.prototype, '_handleSquareClick');
            const wrapper = mount(<Square { ...defaultProps } />);
            wrapper.find('.-square').simulate('click');

            expect(Square.prototype._handleSquareClick.calledOnce).toBe(true);
        });
    });
});
