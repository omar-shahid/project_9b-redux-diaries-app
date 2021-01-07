import { Box, Button, Paper, TextField, Typography } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import React from "react";
import NavBar from "../components/NavBar";
import useStyles from "../styles";

function Register() {
  const classes = useStyles();
  return (
    <>
      <NavBar />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="90vh"
      >
        <Box minHeight="50%">
          <Paper style={{ height: "100%" }} elevation={5}>
            <Box padding={5}>
              <Typography
                className={classes.headingGrey}
                variant="h3"
                component="h3"
                align="center"
              >
                Register Yourself
              </Typography>
              <form noValidate autoComplete="off">
                <Box marginBottom={2}>
                  <TextField id="standard-basic" fullWidth label="Name" />
                </Box>
                <Box marginBottom={2}>
                  <TextField id="standard-basic" fullWidth label="Email" />
                </Box>
                <Box marginBottom={2}>
                  <TextField id="standard-basic" fullWidth label="Password" />
                </Box>
                <Box marginTop={3}>
                  <Button variant="contained" color="primary">
                    Primary
                  </Button>
                </Box>
              </form>
            </Box>
          </Paper>
        </Box>
      </Box>
    </>
  );
}

export default Register;
