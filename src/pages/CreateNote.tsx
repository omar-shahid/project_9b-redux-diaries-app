import React, { useState } from "react";
import NavBar from "../components/NavBar";
import Markdown from "markdown-to-jsx";
import { AppBar, Tabs, Tab, Box, Button } from "@material-ui/core";
import { Controlled as CodeMirror2 } from "react-codemirror2";
import "codemirror/mode/markdown/markdown";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/duotone-light.css";
import { Link } from "react-router-dom";
import useStyles from "../styles";
import { addNote, createNote } from "../features/notesSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import CheckForToken from "../components/checkForToken";
// @ts-ignore
import swal from "@sweetalert/with-react";

function CreateNote() {
  const [value, setValue] = useState(0);
  const [content, setContent] = useState("#Hello");
  const user = useSelector((state: RootState) => state.user);
  const dispatch: AppDispatch = useDispatch();
  const setRedirect = CheckForToken();
  const handleChange = (_: React.ChangeEvent<{}>, newValue: number) =>
    setValue(newValue);

  const handleSave = () =>
    dispatch(
      createNote({ token: user.token, userId: user.userId, content })
    ).then((data) =>
      setRedirect([
        data,
        () =>
          swal({
            title: "Good job!",
            text: "You clicked the button!",
            icon: "success",
            button: "Aww yiss!",
          }),
      ])
    );
  return (
    <>
      <NavBar />

      <Box width="80vw" marginX="auto" marginTop="16px">
        <Box
          display="flex"
          justifyContent="flex-end"
          width="100%"
          marginY="14px"
        >
          <Button
            onClick={() => handleSave()}
            variant="contained"
            color="primary"
          >
            Save
          </Button>
        </Box>
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
          >
            <Tab label="Markdown" />
            <Tab label="Preview" />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <CodeMirror2
            value={content}
            options={{
              mode: "markdown",
              theme: "duotone-light",
              lineNumbers: true,
            }}
            className="height text-xl"
            onBeforeChange={(editor, data, value) => {
              setContent(value);
            }}
            onChange={(editor, data, value) => {}}
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Box
            maxHeight="450px"
            overflow="scroll"
            bgcolor="white"
            padding="26px"
          >
            <Markdown>{content}</Markdown>
          </Box>
        </TabPanel>
      </Box>
    </>
  );
}
interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <>{children} </>}
    </div>
  );
}

export default CreateNote;
