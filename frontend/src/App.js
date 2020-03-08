import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import CustomLayout from './containers/layout/Layout';
import BaseRouter from './routes'

import * as authActions from './store/actions/auth';

import './assets/styles/App.css';

class App extends Component {

  render() {
    return (
      <Router>
        <CustomLayout {...this.props}>
          <BaseRouter />
        </CustomLayout>
      </Router>
    )
  }
}

const mapStateToProps = state => {
  return {
      isAuthenticathed: !!state.auth.isAuthenticated
  }
}

const mapDispatchToProps = dispatch => {
  return {
      onTryAutoSignup: () => dispatch(authActions.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
