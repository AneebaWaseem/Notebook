import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'

const loadNotes = () => {
  try {
    const notesFromStorage = localStorage.getItem("notes");
    return notesFromStorage ? JSON.parse(notesFromStorage) : [];
  } catch (e) {
    console.warn("Failed to parse notes from localStorage:", e);
    localStorage.removeItem("notes"); // clear corrupted data
    return [];
  }
};

const initialState = {
  notes: loadNotes(),
};


export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    add: (state, action) => {
      const note = action.payload
      state.notes.push(note)
      
      localStorage.setItem("notes", JSON.stringify(state.notes))
      
      toast("Memory Saved Successfully!")
    },
    update: (state, action) => {
      const note = action.payload
      const ind = state.notes.findIndex((item) => item.id == note.id)
      if(ind >= 0) {
        state.notes[ind] = note

        localStorage.setItem("notes", JSON.stringify(state.notes))
      
        toast("Memory Updated Successfully!")
      }
    },
    remove: (state, action) => {
      const note = action.payload
      const ind = state.notes.findIndex((item) => item.id == note.id)
      if(ind >= 0) {
        state.notes.splice(ind, 1)

        localStorage.setItem("notes", JSON.stringify(state.notes))
      
        toast("Memory Deleted Successfully!")
      }
    },
    reset: (state) => {
      state.notes = []
      localStorage.removeItem("notes")
      toast("All Memories Cleared!")
    },
  },
})

// Action creators are generated for each case reducer function
export const { add, update, reset, remove } = appSlice.actions

export default appSlice.reducer