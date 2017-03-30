/* eslint-disable react/prefer-stateless-function */

import React, { Component } from 'react';
import logo from './images/logo.svg';

const propTypes = {
    children: React.PropTypes.array.isRequired
};

class App extends Component {
    render() {
        const { children } = this.props;

        return (
            <div className="app">
                <div className="app-header">
                    <img src={ logo } className="app-logo" alt="React" />
                </div>
                <main>{ children }</main>
            </div>
        );
    }
}

App.propTypes = propTypes;

export default App;
