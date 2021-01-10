import React, { useEffect } from "react";
import NavBar from "../components/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { fetchNotes } from "../features/notesSlice";
import { logout } from "../features/userSlice";
import { AuthErrorResponse } from "../types";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button } from "@material-ui/core";
import useStyles from "../styles";

function Dashboard() {
  const classes = useStyles();

  const navigate = useNavigate();

  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(fetchNotes({ token: user.token, userId: user.userId })).then(
      (action) => {
        const payload = action.payload as AuthErrorResponse;
        if (payload.haveErrors && payload.errors?.length) {
          dispatch(logout());
          navigate("/login?invalidToken=true");
        }
      }
    );
  }, [dispatch, navigate, user.token, user.userId]);

  return (
    <>
      <NavBar />
      <Box padding="26px" width="90vw" marginX="auto">
        <Box
          display="flex"
          justifyContent="flex-end"
          width="100%"
          marginTop="14px"
        >
          <Link to="/notes/create" className={classes.link}>
            <Button variant="contained" color="primary">
              Create New Note
            </Button>
          </Link>
        </Box>
      </Box>
    </>
  );
}

export default Dashboard;
