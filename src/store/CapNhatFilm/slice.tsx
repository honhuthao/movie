import { createSlice } from "@reduxjs/toolkit";
import { CapNhatPhimThunk } from "./Thunk";
import { DataFilm } from "types/FormDataFilm";
type res = {
  phimCapNhat?: DataFilm;
};
const initialState: res = {};

const CapNhatPhimSlice = createSlice({
  name: "CapNhatPhim",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(CapNhatPhimThunk.fulfilled, (state, { payload }) => {
      state.phimCapNhat = payload;
      alert("Cập nhật thành công");
    });
    builder.addCase(CapNhatPhimThunk.rejected, () => {
      alert("Cập nhật thất bại");
    });
  },
});

export const {} = CapNhatPhimSlice.actions;

export default CapNhatPhimSlice.reducer;
