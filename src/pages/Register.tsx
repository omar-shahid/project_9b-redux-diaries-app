import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import useStyles from "../styles";
import Alert from "@material-ui/lab/Alert";

import { Box, Button, Paper, TextField, Typography } from "@material-ui/core";
import { Formik } from "formik";
import { loginAsync } from "../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { useNavigate } from "react-router-dom";
import { AuthErrorResponse } from "../types";

function Register() {
  const navigate = useNavigate();

  const dispatch: AppDispatch = useDispatch();
  const [errors, setErrors] = useState<string[]>([]);
  const token = useSelector((state: RootState) => state.user.token);

  const classes = useStyles();

  useEffect(() => {
    if (!!token.length) navigate("/dashboard");
  }, [token.length, navigate]);
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
              {errors?.map((el) => (
                <Alert key={el} severity="error">
                  {el}
                </Alert>
              ))}
              <Typography
                className={classes.headingGrey}
                variant="h3"
                component="h3"
                align="center"
              >
                Register Yourself
              </Typography>
              <Formik
                initialValues={{
                  name: "",
                  email: "",
                  password: "",
                  confPassword: "",
                }}
                onSubmit={(values) => {
                  dispatch(loginAsync(values)).then((data) => {
                    const payloadData = data.payload as AuthErrorResponse;
                    if (payloadData.haveErrors) setErrors(payloadData.errors);
                  });
                }}
              >
                {({ values, handleSubmit, handleChange }) => (
                  <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                    <Box marginBottom={2}>
                      <TextField
                        id="standard-basic"
                        value={values.name}
                        name="name"
                        onChange={handleChange}
                        fullWidth
                        label="Name"
                      />
                    </Box>
                    <Box marginBottom={2}>
                      <TextField
                        id="standard-basic"
                        value={values.email}
                        name="email"
                        onChange={handleChange}
                        fullWidth
                        label="Email"
                      />
                    </Box>
                    <Box marginBottom={2}>
                      <TextField
                        id="standard-basic"
                        value={values.password}
                        name="password"
                        onChange={handleChange}
                        fullWidth
                        type="password"
                        label="Password"
                      />
                    </Box>
                    <Box marginBottom={2}>
                      <TextField
                        id="standard-basic"
                        name="confPassword"
                        type="password"
                        value={values.confPassword}
                        onChange={handleChange}
                        fullWidth
                        label="Confirm Password"
                      />
                    </Box>
                    <Box marginTop={3}>
                      <Button variant="contained" type="submit" color="primary">
                        Submit
                      </Button>
                    </Box>
                  </form>
                )}
              </Formik>
            </Box>
          </Paper>
        </Box>
      </Box>
    </>
  );
}

export default Register;
