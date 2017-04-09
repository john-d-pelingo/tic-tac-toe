import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactGA from 'react-ga';

import logo from './images/logo.svg';

const propTypes = {
    children: PropTypes.array.isRequired
};

class App extends Component {
    constructor(props) {
        super(props);

        ReactGA.initialize('UA-70753213-2');
        // This just needs to be called once since we have no routes in this case.
        ReactGA.pageview(window.location.pathname);
    }

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
