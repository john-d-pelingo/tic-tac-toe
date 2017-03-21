/* eslint-disable react/prefer-stateless-function */

import React, { Component } from 'react';
import logo from './images/logo.svg';
import './style.css';

const propTypes = {
    children: React.PropTypes.object.isRequired
};

class App extends Component {
    render() {
        const { children } = this.props;

        return (
            <div className="App">
                <div className="App-header">
                    <img src={ logo } className="App-logo" alt="logo" />
                    <h2>Welcome!</h2>
                </div>
                <main>{ children }</main>
            </div>
        );
    }
}

App.propTypes = propTypes;

export default App;
