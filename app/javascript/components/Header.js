
import styled from 'styled-components'
import { render } from "react-dom";

/*const Header = () => (
  <Paper
    elevation={0}
    style={{ padding: 0, margin: 0, backgroundColor: "#fafafa" }}
  >
    <AppBar color="primary" position="static" style={{ height: 64 }}>
      <Toolbar style={{ height: 64 }}>
        <Typography color="inherit" align="center">TODO APP</Typography>
      </Toolbar>
    </AppBar>
    {props.children}
  </Paper>
));*/

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textAlign: "center",
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Todo List
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

// export default Header;
/*
const StyledHeader = styled.div`
  background: #333;
  color: #fff;
  text-align: center;
  padding: 20px;
  font-size: 25px;
`

function Header(){
  return (
    <StyledHeader>Todo List</StyledHeader>
  );
}

export default Header*/