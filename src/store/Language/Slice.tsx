import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  language: "en",
};

const setUpNgonNguSlice = createSlice({
  name: "setUpNgonNgu",
  initialState,
  reducers: {
    setUpNgonNgu: (state, { payload }) => {
      state.language = payload;
    },
  },
});

export const { setUpNgonNgu } = setUpNgonNguSlice.actions;

export default setUpNgonNguSlice.reducer;
