import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import useStyles from "../styles";

export default function NavBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" className={classes.title}>
            News
          </Typography>
          <Link to="/login" className={classes.link}>
            <Button color="inherit">Login</Button>
          </Link>
          <Link to="/register" className={classes.link}>
            <Button color="inherit">Register</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}
