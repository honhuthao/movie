import { createSlice } from "@reduxjs/toolkit";
import { DataFilm } from "types/FormDataFilm";
import { layThongTinPhimThunk } from "./Thunk";
type res = {
  ThongTinPhim?: DataFilm;
};
const initialState: res = {};

const LayThongTinPhimSlice = createSlice({
  name: "LayThongTinPhim",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(layThongTinPhimThunk.fulfilled, (state, { payload }) => {
      state.ThongTinPhim = payload;
    });
    builder.addCase(layThongTinPhimThunk.pending, (state) => {
      state.ThongTinPhim = undefined;
    });
  },
});

export const {} = LayThongTinPhimSlice.actions;

export default LayThongTinPhimSlice.reducer;
