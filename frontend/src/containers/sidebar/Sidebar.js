import React from "react";
import { Drawer, List, Hidden } from "@material-ui/core";
import { sidebarWidth } from "../../constants";
import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";
import { mobileDrawerOpen, setMobileDrawerOpen } from '../../store/actions/responsive';
import { useDispatch, useSelector } from "react-redux";

const Container = styled.div`
  height: 100%;
  background-color: #666eee;
`;

const TopArea = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;

const LinkStyles = styled.div`
  display: 'block',
  color: '#8e97d8',
  fontWeight: 'bold',
  padding: '6px 20px',
  textDecoration: 'none'
  &:hover {
    color: #fff;
    cursor: pointer;
  }
  &.active {
    color: #fff;
  }
`;

const Sidebar = () => {
  const dispatch = useDispatch();
  const mobileOpen = Boolean(useSelector(mobileDrawerOpen));

  const handleCloseMobileDrawer = () => {
    dispatch(setMobileDrawerOpen(false));
  };

  return (
    <>
      <Hidden smUp implementation="css">
        <Drawer
          variant="temporary"
          anchor="left"
          open={mobileOpen}
          onClose={handleCloseMobileDrawer}
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
  // const history = useHistory();

  return (
    <Container>
      <TopArea>
        Logo
      </TopArea>
      <List
        css={`
          width: ${sidebarWidth}px;
          margin-top: 40px;
        `}
      >
        <LinkStyles>
          <NavLink to="/" exact>
            Consulter les annonces
        </NavLink>
        </LinkStyles>
        <LinkStyles>
          <NavLink to="/mon-compte/profil" exact>
            Profil
        </NavLink>
        </LinkStyles>
        <LinkStyles>
          <NavLink to="/mon-compte/vos-annonces" exact>
            Vos annonces
        </NavLink>
        </LinkStyles>
        <LinkStyles>
          <NavLink to="/mon-compte/notifications" exact>
            Notifications
        </NavLink>
        </LinkStyles>
      </List>
      <BottomBlock>
      </BottomBlock>
    </Container>
  );
};

export default Sidebar;