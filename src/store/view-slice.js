import { createSlice } from "@reduxjs/toolkit";

const viewSlice = createSlice({
  name: "view",
  initialState: {
    view: "Mosaic",
    newBookModalOpen: false,
    editBookModalOpen: false,
    editBookFormData: null,
  },
  reducers: {
    toggleView(state, action) {
      state.view = action.payload;
    },
    toggleNewBookModalState(state, action) {
      state.newBookModalOpen = action.payload;
    },
    toggleEditBookModalState(state, action) {
      state.editBookModalOpen = action.payload.open;
      state.editBookFormData = action.payload.data;
    },
  },
});

export const viewActions = viewSlice.actions;

export default viewSlice;
