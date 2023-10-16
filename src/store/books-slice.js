import { createSlice } from "@reduxjs/toolkit";

const booksSlice = createSlice({
  name: "books",
  initialState: {
    books: null,
  },
  reducers: {
    storeBooks(state, action) {
      state.books = action.payload;
    },
  },
});

export const booksActions = booksSlice.actions;

export default booksSlice;
