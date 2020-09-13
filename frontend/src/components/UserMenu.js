import React from "react";
import { Button, Menu, MenuItem, Avatar } from "@material-ui/core";
import { css } from "@emotion/core";
import styled from "@emotion/styled";
import { useDispatch } from "react-redux";
import { avatarStyles } from "../styles";
import { useHistory } from "react-router-dom";
import * as authActions from '../store/actions/auth';

const Username = styled.div`
  color: #333;
  text-align: center;
  border-bottom: 1px solid #ccc;
  padding-bottom: 0.5rem;
  max-width: 200px;
  word-break: break-all;
  padding: 0.25rem 1rem 0.5rem 1rem;
  &:focus {
    outline: none;
  }
`;


const UserMenu = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        setAnchorEl(null);
        dispatch(authActions.authLogout());
        history.push("/");
    };

    return (
        <div>
            <Button
                aria-controls="user-menu"
                aria-haspopup="true"
                onClick={handleClick}
                css={css`
                    min-height: 1.5rem;
                    padding: 0;
                    border-radius: 50%:
                    &:hover {
                        background-color: initital;
                    }
                `}
            >
                <Avatar
                    css={avatarStyles}
                    src={""}
                    alt="user-avatar"
                >
                    user
                </Avatar>
            </Button>
            <Menu
                anchorEl={anchorEl}
                getContentAnchorEl={null}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                transitionDuration={0}
                keepMounted
            >
                <Username>user</Username>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </div>
    )
}

export default UserMenu;