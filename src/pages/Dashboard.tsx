import React, { useEffect } from "react";
import NavBar from "../components/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { fetchNotes } from "../features/notesSlice";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@material-ui/core";
import useStyles from "../styles";
import CheckForToken from "../components/checkForToken";
import Markdown from "markdown-to-jsx";

import swal from "@sweetalert/with-react";

function Dashboard() {
  const classes = useStyles();

  const navigate = useNavigate();

  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const notes = useSelector((state: RootState) => state.notes);
  const setRedirect = CheckForToken();

  useEffect(() => {
    dispatch(
      fetchNotes({ token: user.token, userId: user.userId })
    ).then((data) => setRedirect([data, () => {}]));
  }, [dispatch, navigate, setRedirect, user.token, user.userId]);

  return (
    <>
      <NavBar />
      <Box padding="26px" width="90vw" marginX="auto">
        <Box
          display="flex"
          justifyContent="flex-end"
          width="100%"
          marginY="14px"
        >
          <Link to="/notes/create" className={classes.link}>
            <Button variant="contained" color="primary">
              Create New Note
            </Button>
          </Link>
        </Box>
        <Grid container spacing={2} className={classes.root}>
          <Grid item xs={12}>
            <Grid container justify="flex-start" spacing={7}>
              {notes.map((note, ind) => (
                <Box key={note.createdAt} padding={2} minWidth="25%">
                  <Card>
                    <CardContent>
                      <Typography color="textSecondary" gutterBottom>
                        {new Date(note.createdAt).toDateString()}
                      </Typography>
                      <Markdown>{note.content.substr(0, 100)}</Markdown>
                    </CardContent>
                    <CardActions>
                      <Button
                        onClick={() =>
                          swal(
                            <Markdown className="note">{note.content}</Markdown>
                          )
                        }
                        size="small"
                        color="primary"
                        variant="contained"
                      >
                        See Note
                      </Button>
                      <Link
                        to={`/notes/edit?noteId=${ind}`}
                        className={classes.link}
                      >
                        <Button
                          // onClick={() }
                          size="small"
                          // color=""
                          variant="contained"
                        >
                          Edit
                        </Button>
                      </Link>

                      <Button
                        // onClick={() }
                        size="small"
                        color="secondary"
                        variant="outlined"
                      >
                        Delete
                      </Button>
                    </CardActions>
                  </Card>
                </Box>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Dashboard;
