import React from "react";
import { Drawer, List, Hidden } from "@material-ui/core";
import { css } from "@emotion/core";
import { sidebarWidth } from "../../constants";
import styled from "@emotion/styled";
import { NavLink, useHistory } from "react-router-dom";

const Container = styled.div`
  height: 100%;
  background-color: #666eee;
`;

const TopArea = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;

const linkStyles = css`
  display: block;
  color: #8e97d8;
  font-weight: bold;
  padding: 6px 20px;
  text-decoration: none;
  &:hover {
    color: #fff;
    cursor: pointer;
  }
  &.active {
    color: #fff;
  }
`;

const Sidebar = () => {

  return (
    <>
      <Hidden smUp implementation="css">
        <Drawer
          variant="temporary"
          anchor="left"
          ModalProps={{ keepMounted: true }}
        >
          <DrawerContent />
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer anchor="left" variant="permanent">
          <DrawerContent />
        </Drawer>
      </Hidden>
    </>
  );
};

const BottomBlock = styled.div`
  position: absolute;
  left: 0px;
  bottom: 2rem;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const DrawerContent = () => {
  const history = useHistory();

  return (
    <Container>
      <TopArea>
        Logo
      </TopArea>
      <List
        css={css`
          width: ${sidebarWidth}px;
          margin-top: 40px;
        `}
      >
        <NavLink to="/" exact css={linkStyles}>
          Home
        </NavLink>
      </List>
      <BottomBlock>
      </BottomBlock>
    </Container>
  );
};

export default Sidebar;