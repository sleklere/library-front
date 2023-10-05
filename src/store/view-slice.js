import { createSlice } from "@reduxjs/toolkit";

const viewSlice = createSlice({
  name: "user",
  initialState: {
    view: "Mosaic",
    newBookModalOpen: false,
    editBookModalOpen: false,
  },
  reducers: {
    toggleView(state, action) {
      state.view = action.payload;
    },
    toggleNewBookModalState(state, action) {
      state.newBookModalOpen = action.payload;
    },
    toggleEditBookModalState(state, action) {
      state.newBookModalOpen = action.payload;
    },
  },
});

export const viewActions = viewSlice.actions;

export default viewSlice;
