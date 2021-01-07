import { Box, Typography, useMediaQuery, useTheme } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import React from "react";
import "./App.css";
// import classes from "*.module.css";
import NavBar from "./components/NavBar";
import useStyles from "./styles";
import { MenuBook } from "@material-ui/icons";

function App() {
  fetch("/api/reminders")
    .then((re) => re.json())
    .then((e) => console.log(e));
  const theme = useTheme();
  const smBreakPoint = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyles();
  return (
    <>
      <NavBar />
      <Box
        display="flex"
        height="80%"
        justifyContent="center"
        alignItems="center"
      >
        <Box maxWidth="70%">
          <Typography
            className={classes.headingGrey}
            variant={smBreakPoint ? "h2" : "h1"}
            component="h1"
          >
            <strong color={grey[500]}>Welcome to Diaries App</strong>
          </Typography>
          <Typography variant="body1">
            Register now to write your diary!
          </Typography>
        </Box>
      </Box>
    </>
  );
}

export default App;
