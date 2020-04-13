import React, { Component } from 'react';
import { Link, withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import * as authActions from '../../store/actions/auth';

class CustomLayout extends Component {
  
  state = {
    theme: 'light-theme'
  }

  toggleThemes = () => {
    const { theme } = this.state;
    return (theme === 'light-theme') ? this.setState({'theme': 'dark-theme'}) : this.setState({'theme': 'light-theme'});
  }
  
  renderCopyright = () => {
    const copyright = new Date().getFullYear();
    return {__html: `&copy; ${copyright} Dopejob`};
  }

  disconnect = () => {
    this.props.logout();
    this.props.history.push('/');
  }

  render() {
      const { isAuthenticated, children, location: { pathname } } = this.props;
      const { theme } = this.state;
      return (
        <div id="app" className={theme}>
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
              {isAuthenticated ?
              <button 
                onClick={this.disconnect}
                className="navbar__link fl-r">Se déconnecter</button>
              :
              <div></div>
              }
          </nav>
          }
          {children}
          <footer className="footer">
            <ul>
              <li><button onClick={this.toggleThemes}>Theme</button></li>
              <li className="fl-l" dangerouslySetInnerHTML={this.renderCopyright()}></li>
              <li className="fl-l"><Link to="/legal" className="link">Politique relative aux cookies, politique de confidentialité et conditions d'utilisation</Link></li>
            </ul>
          </footer>
        </div>
      )
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: !!state.auth.isAuthenticated
  }
}

const mapDispatchToProps = dispatch => {
  return {
      logout: () => dispatch(authActions.authLogout())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomLayout))
