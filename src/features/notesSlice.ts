import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import {
  AuthAccessCredentials,
  AuthErrorResponse,
  CreateNoteRequest,
} from "../types";
// import { logout } from "./userSlice";

type Note = {
  name: string;
  createdAt: string;
  userId: number;
  content: string;
};

type NotesState = Note[];

const initialState: NotesState = [];

export const fetchNotes = createAsyncThunk(
  "notes/fetchNotes",
  (values: AuthAccessCredentials, api) =>
    axios
      .post("/api/notes", { values })
      .then((res) => res.data)
      .then((notes) => {
        api.dispatch(addAllNotes(notes));
      })
      .catch((e) => {
        console.log(e);
        return {
          haveErrors: true,
          errors: e?.response?.data as string[],
        } as AuthErrorResponse;
      })
);

export const createNote = createAsyncThunk(
  "notes/add",
  (values: CreateNoteRequest, api) =>
    axios
      .post<CreateNoteRequest, AxiosResponse<Note>>("/api/notes/create", {
        values,
      })
      .then((res) => res.data)
      .then((note) => api.dispatch(addNote(note)))
      .catch((e) => ({
        haveErrors: true,
        errors: e?.response?.data as string[],
      }))
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
    emptyNotes: () => initialState,
  },
});

export const {
  addAllNotes,
  addNote,
  deleteNote,
  editNote,
  emptyNotes,
} = notesSlice.actions;

export default notesSlice.reducer;
