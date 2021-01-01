import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from "@emotion/styled";
import { sidebarWidth } from "../../constants";
import { useTheme } from "@material-ui/core";
import Navbar from '../../components/Navbar';
import Sidebar from '../../containers/sidebar/Sidebar';

const Main = styled.div`
  ${(props) => props.theme.breakpoints.up("sm")} {
    margin-left: ${sidebarWidth + 8}px;
  }
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 1rem;
  padding-bottom: 1rem;
  width: 100%;
  bottom: 0;
  text-align: center;
`;

const Copyright = () => {
  const copyright = new Date().getFullYear();
  const htmlFooter = { __html: `&copy; ${copyright} DopeJob` };
  return (
    <Footer dangerouslySetInnerHTML={htmlFooter}></Footer>
  )
}

const Wrapper = ({ children }) => {
  const theme = useTheme();

  return (
    <div className="flex flex-col min-h-screen overflow-hidden" theme={theme}>
      <main className="flex-grow">
        {children}
      </main>
      <Copyright></Copyright>
    </div>
  );
};

const WrapperAuthenticated = ({ children }) => {
  const theme = useTheme();

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <main className="flex-grow">
        <Sidebar />
        <Main theme={theme}>
          <Navbar />
          {children}
        </Main>
      </main>
      <Copyright></Copyright>
    </div>
  );
};


class CustomLayout extends Component {

  render() {
    const { isAuthenticated, children } = this.props;

    return (

      <div id="app">
        {isAuthenticated ?
          <WrapperAuthenticated>
            {children}
          </WrapperAuthenticated>
          : <Wrapper>
            {children}
          </Wrapper>
        }
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
