import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { NotesState } from "../../types";
import { storageService } from "../../services/storage";
import type { RootState } from "../index";

const initialState: NotesState = {
  notes: {},
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    saveNote: (
      state,
      action: PayloadAction<{ cityId: string; note: string }>
    ) => {
      state.notes[action.payload.cityId] = action.payload.note;
      storageService.saveNotes(state.notes);
    },
    deleteNote: (state, action: PayloadAction<string>) => {
      delete state.notes[action.payload];
      storageService.saveNotes(state.notes);
    },
    loadNotes: (state) => {
      const notes = storageService.loadNotes();
      state.notes = notes;
    },
  },
});

export const { saveNote, deleteNote, loadNotes } = notesSlice.actions;

// Selectors
export const selectNoteForCity = (state: RootState, cityId: string) =>
  state.notes.notes[cityId] || "";

export default notesSlice.reducer;
