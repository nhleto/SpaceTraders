import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Button } from '@material-ui/core';

const Header = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      display: 'flex',
      justifyContent: 'space-between',
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const pluralize = (obj, word) => {
    if (obj.length === 1) {
      return word
    } else {
      return `${word}'s`
    }
  }

  return (
    <AppBar position="static">
      <Toolbar className='toolbar'>
        <div className="navbar-start">
          {props.signin === false ? null :
            <Button
              variant='contained'
              color='secondary'
              onClick={props.isLoggedIn}
            >Logout</Button>
          }
        </div>
        {props.profile !== '' && props.signin === true ?
          <div className="navbar-end">
            <IconButton
              className={useStyles.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={handleClick} >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}>
              <MenuItem>{props.profile.credits} Credits</MenuItem>
              <MenuItem>{Object.keys(props.profile.ships).length} {pluralize(props.profile.ships, 'Ship')}</MenuItem>
            </Menu>
            <Typography variant="h6" className={useStyles.title}>
              {props.profile.username}
            </Typography>
          </div>
          : null}
      </Toolbar>
    </AppBar>
  )
}

export default Header
