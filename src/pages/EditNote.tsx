import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Markdown from "markdown-to-jsx";
import { AppBar, Tabs, Tab, Box, Button } from "@material-ui/core";
import { Controlled as CodeMirror2 } from "react-codemirror2";
import "codemirror/mode/markdown/markdown";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/duotone-light.css";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Note, editNoteAction } from "../features/notesSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import CheckForToken from "../components/checkForToken";
import swal from "@sweetalert/with-react";

function EditNote() {
  const [query] = useSearchParams();
  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  const user = useSelector((state: RootState) => state.user);
  const notes = useSelector((state: RootState) => state.notes);
  // const [note, setNote] = useState<Note>({})
  const [content, setContent] = useState("");
  const [setNoteId] = useState(NaN);
  const [note, setNote] = useState<Note>();
  const dispatch: AppDispatch = useDispatch();
  const setRedirect = CheckForToken();

  useEffect(() => {
    const noteID = parseInt(query.get("noteId") as string);
    // console.log(noteID, notes[noteID]);
    if (isNaN(noteID) || !notes[noteID]) return navigate("/dashboard");
    setNote(notes[noteID]);
  }, [navigate, note, notes, query, setNoteId]);

  const handleChange = (_: React.ChangeEvent<{}>, newValue: number) =>
    setValue(newValue);

  const handleSave = async () => {
    console.log("Clicked!");
    const data = await dispatch(
      editNoteAction({
        token: user.token,
        userId: user.userId,
        note: { ...note, content } as Note,
      })
    );
    return setRedirect([
      data,
      () =>
        swal({
          title: "Success!",
          text: "Note edited successfully",
          icon: "success",
          button: "Okay",
        }),
    ]);
  };
  useEffect(() => {
    if (note) setContent(note.content);
  }, [note]);
  if (!note) return <>Loading</>;
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
            onBeforeChange={(_0, _1, value) => {
              setContent(value);
            }}
            onChange={() => {}}
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

export default EditNote;
