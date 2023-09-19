import { createSlice } from "@reduxjs/toolkit";

const viewSlice = createSlice({
  name: "user",
  initialState: { view: "Mosaic" },
  reducers: {
    toggleView(state, action) {
      state.view = action.payload;
    },
  },
});

export const viewActions = viewSlice.actions;

export default viewSlice;
