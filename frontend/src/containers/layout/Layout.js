import React, { Component } from 'react';
import { Link, withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import * as authActions from '../../store/actions/auth';

class CustomLayout extends Component {
  
  renderCopyright = () => {
    const copyright = new Date().getFullYear();
    return {__html: `&copy; ${copyright} Dopejob`};
  }
  render() {
      const { isAuthenticated, children, location: { pathname } } = this.props;
      return (
        <div>
          { (pathname).includes('login') || (pathname).includes('signup') ?
          <div></div> :
          <nav className="navbar">
              <NavLink
                className="navbar__link"
                to="/"
              >
                logo
              </NavLink>
              <NavLink
                exact
                activeClassName="navbar__link--active"
                className="navbar__link"
                to="/"
              >
                Search
              </NavLink>
              {isAuthenticated ?
              <NavLink
                exact
                activeClassName="navbar__link--active"
                className="navbar__link"
                to="/mon-compte/profil"
              >
                Mon espace
              </NavLink>
              :
              <NavLink
                exact
                activeClassName="navbar__link--active"
                className="navbar__link fl-r"
                to="/login"
              >
                Se connecter
              </NavLink>
              }
          </nav>
          }
          {children}
          <footer className="footer">
            <ul>
              <li className="fl-l" dangerouslySetInnerHTML={this.renderCopyright()}></li>
              <li className="fl-l"><Link to="/legal" className="link">Politique relative aux cookies, politique de confidentialité et conditions d'utilisation</Link></li>
            </ul>
          </footer>
        </div>
      )
  }
}

/*

© 2020 Indeed
Centre de confidentialité

*/

const mapStateToProps = state => {
  return {
    isAuthenticathed: !!state.auth.isAuthenticathed
  }
}

const mapDispatchToProps = dispatch => {
  return {
      logout: () => dispatch(authActions.authLogout())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomLayout))
