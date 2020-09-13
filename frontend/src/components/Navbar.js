import React from "react";
import styled from "@emotion/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { barHeight } from "../constants";
import { faBars, faBusinessTime } from "@fortawesome/free-solid-svg-icons";
import { Hidden } from "@material-ui/core";
import UserMenu from './UserMenu';
import { setMobileDrawerOpen } from '../store/actions/responsive';
import { useDispatch } from "react-redux";

const Container = styled.div`
  min-height: ${barHeight}px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  border-bottom: 1px solid #999;
`;

const Item = styled.div`
  font-size: 1rem;
  color: #333;
`;

const Icons = styled.div`
  font-size: 1.25rem;
  a {
    color: #888;
    &:hover {
      color: #333;
    }
  }
  .active {
    color: #333;
  }
`;

const Navbar = () => {
  const dispatch = useDispatch();
  return (
    <Container>
      <Item>
        <Icons>
          <Hidden smUp implementation="css">
            <FontAwesomeIcon
              icon={faBars}
              onClick={() => dispatch(setMobileDrawerOpen(true))}
            />
          </Hidden>
          <Hidden xsDown implementation="css">
            <FontAwesomeIcon icon={faBusinessTime} />
          </Hidden>
        </Icons>
      </Item>
      <Item>DopeJob</Item>
      <Item>
        <UserMenu />
      </Item>
    </Container>
  );
};

export default Navbar;