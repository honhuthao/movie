import { createSlice } from "@reduxjs/toolkit";
import { ThemPhimThunk } from "./Thunk";
import { DataFilm } from "types/FormDataFilm";
type res = {
  filmData?: DataFilm;
};
const initialState: res = {};

const ThemPhimSlice = createSlice({
  name: "ThemPhim",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(ThemPhimThunk.fulfilled, (state, { payload }) => {
      state.filmData = payload;
    });
  },
});

export const {} = ThemPhimSlice.actions;

export default ThemPhimSlice.reducer;
