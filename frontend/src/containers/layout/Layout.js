import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
// import { barHeight } from "../../constants";
import styled from "@emotion/styled";
import { sidebarWidth } from "../../constants";
import { useTheme, Button } from "@material-ui/core";
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

const Item = styled.div`
  font-size: 1rem;
  color: #333;
`;

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
    <Container theme={theme}>
      <Item>
        <Title>DopeJob</Title>
      </Item>
      <Item><Button component={Link} to="/signup" color="inherit">Signup</Button></Item>
      <Item><Button component={Link} to="/login" color="inherit">Login</Button></Item>
      <div>
        {children}
      </div>
      <Copyright></Copyright>
    </Container>
  );
};

const WrapperAuthenticated = ({ children }) => {
  const theme = useTheme();

  return (
    <div>
      <Sidebar />
      <Main theme={theme}>
        <Navbar />
        {children}
      </Main>
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
