import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import useStyles from "../styles";
import Alert from "@material-ui/lab/Alert";

import { Box, Button, Paper, TextField, Typography } from "@material-ui/core";
import { Formik } from "formik";
import { loginAction } from "../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AuthErrorResponse, LoginUserForm } from "../types";

function Login() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const dispatch: AppDispatch = useDispatch();
  const [errors, setErrors] = useState<string[]>([]);
  const token = useSelector((state: RootState) => state.user.token);

  const classes = useStyles();

  useEffect(() => {
    if (!!token.length) navigate("/dashboard");
  }, [token.length, navigate]);

  useEffect(() => {
    const invalidToken = searchParams.get("invalidToken");
    if (invalidToken)
      setErrors((p) => p.concat("Your session has been expired."));
  }, [searchParams]);
  return (
    <>
      <NavBar />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="90vh"
      >
        <Box minHeight="50%" minWidth="50%">
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
                Login
              </Typography>
              <Formik
                initialValues={{
                  email: "",
                  password: "",
                }}
                onSubmit={(values) => {
                  const trimmedValues: Record<string, string> = {};
                  Object.keys(values).forEach(
                    (el) =>
                      (trimmedValues[el] = (values as {
                        [key: string]: string;
                      })[el].trim())
                  );
                  console.log(trimmedValues);
                  dispatch(loginAction(trimmedValues as LoginUserForm)).then(
                    (data) => {
                      const payloadData = data.payload as AuthErrorResponse;
                      if (payloadData?.haveErrors)
                        setErrors(payloadData.errors);
                    }
                  );
                }}
              >
                {({ values, handleSubmit, handleChange }) => (
                  <form noValidate autoComplete="off" onSubmit={handleSubmit}>
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

export default Login;
