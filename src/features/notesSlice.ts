import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

type Note = {
  name: string;
  createdAt: string;
  userId: number;
  note: string;
};

type NotesState = Note[];

const initialState: NotesState = [];

export const fetchNotes = createAsyncThunk("notes/fetchNotes", (_, api) =>
  axios
    .get("/api/notes")
    .then((res) => res.data)
    .then((notes) => {
      api.dispatch(addAllNotes(notes));
    })
);

export const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addAllNotes: (_, action: PayloadAction<NotesState>) => action.payload,
    deleteNote: (state, action: PayloadAction<number>) =>
      state.filter((_, ind) => ind !== action.payload),
    addNote: (state, action: PayloadAction<Note>) => {
      state.push(action.payload);
    },
    editNote: (state, action: PayloadAction<{ id: number; note: Note }>) => {
      state[action.payload.id] = action.payload.note;
    },
  },
});

export const {
  addAllNotes,
  addNote,
  deleteNote,
  editNote,
} = notesSlice.actions;

export default notesSlice.reducer;
