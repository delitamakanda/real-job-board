import React, { Component } from 'react';
import { Link, withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { barHeight } from "../../constants";
import styled from "@emotion/styled";
import { sidebarWidth } from "../../constants";
import { useTheme } from "@material-ui/core";
import Navbar from '../../components/Navbar';
import Sidebar from '../../containers/sidebar/Sidebar';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  margin-top: 0;
  margin-bottom: 0.75rem;
`;

const Main = styled.div`
  ${(props) => props.theme.breakpoints.up("sm")} {
    margin-left: ${sidebarWidth + 8}px;
  }
`;


const Wrapper = ({ children }) => {
  const theme = useTheme();

  const renderCopyright = () => {
    const copyright = new Date().getFullYear();
    return { __html: `&copy; ${copyright} DopeJob` };
  }

  return (
    <Container>
      <Title>DopeJob</Title>
      <div>
        {children}
      </div>
      <div className="fl-l" dangerouslySetInnerHTML={renderCopyright()}></div>
    </Container>
  );
};

const WrapperAuthenticated = ({ children }) => {
  const theme = useTheme();

  const renderCopyright = () => {
    const copyright = new Date().getFullYear();
    return { __html: `&copy; ${copyright} DopeJob` };
  }

  return (
    <div>
      <Sidebar />
      <Main theme={theme}>
        <Navbar />
        {children}
        <div className="fl-l" dangerouslySetInnerHTML={renderCopyright()}></div>
      </Main>
    </div>
  );
};


class CustomLayout extends Component {

  state = {
    theme: 'light-theme'
  }

  toggleThemes = () => {
    const { theme } = this.state;
    return (theme === 'light-theme') ? this.setState({ 'theme': 'dark-theme' }) : this.setState({ 'theme': 'light-theme' });
  }


  render() {
    const { isAuthenticated, children, location: { pathname } } = this.props;
    const { theme } = this.state;

    return (

      <div id="app">
        {isAuthenticated ? <WrapperAuthenticated>
          {children}
        </WrapperAuthenticated> : <Wrapper>{children}</Wrapper>}
        {/* {(pathname).includes('login') || (pathname).includes('signup') ?
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
        </footer> */}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: !!state.auth.isAuthenticated
  }
}

export default withRouter(connect(mapStateToProps)(CustomLayout))
