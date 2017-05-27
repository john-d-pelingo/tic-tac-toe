import React, { Component } from 'react';
import PropTypes from 'prop-types';

import logo from '../images/logo.svg';

const propTypes = {
  children: PropTypes.node.isRequired
};

const defaultProps = {
  children: []
};

class App extends Component {
  constructor(props) {
    super(props);

    /* istanbul ignore next */
    if (process.env.NODE_ENV !== 'test') {
      // eslint-disable-next-line global-require
      const ReactGA = require('react-ga');

      ReactGA.initialize('UA-70753213-2');
      // This just needs to be called once since we have no routes in this case.
      ReactGA.pageview(window.location.pathname);
    }
  }

  render() {
    const { children } = this.props;

    return (
      <div className="app">
        <div className="header">
          <img src={ logo } className="logo" alt="React" />
        </div>
        <main>{ children }</main>
      </div>
    );
  }
}

App.propTypes = propTypes;
App.defaultProps = defaultProps;

export default App;
