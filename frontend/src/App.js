import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import CustomLayout from './containers/layout/Layout';
import BaseRouter from './routes';
import { ThemeProvider, CssBaseline } from "@material-ui/core";
import { Global, css } from "@emotion/core";
import { theme, modalPopperAutocompleteModalIndex } from "./constants";
import { FOCUS_BOX_SHADOW } from './utils/colors';

import * as authActions from './store/actions/auth';
import  './assets/styles/App.css';
import  './assets/styles/index.css';
import  './assets/styles/output.css';

class App extends Component {

  componentDidMount() {
    this.props.onTryAutoSignup()
  }

  render() {
    return (
      <Router>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Global
            styles={css`
              .Mui-focusVisible {
                box-shadow: 0 0 3px 2px ${FOCUS_BOX_SHADOW};
              }
              textarea {
                font-family: inherit;
              }
              .MuiAutocomplete-popper {
                z-index: ${modalPopperAutocompleteModalIndex} !important;
              }
            `}
          />
          <CustomLayout {...this.props}>
            <BaseRouter />
          </CustomLayout>
        </ThemeProvider>
      </Router>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: !!state.auth.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(authActions.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
