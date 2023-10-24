import { createSlice } from "@reduxjs/toolkit";

const booksSlice = createSlice({
  name: "books",
  initialState: {
    books: null,
    booksCopy: null,
  },
  reducers: {
    storeBooks(state, action) {
      state.books = action.payload;
    },
    saveBooksCopy(state, action) {
      state.booksCopy = action.payload;
    },
  },
});

export const booksActions = booksSlice.actions;

export default booksSlice;
