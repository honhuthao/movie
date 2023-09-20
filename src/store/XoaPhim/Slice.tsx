import { createSlice } from "@reduxjs/toolkit";
import { XoaPhimThunk } from "./Thunks";
import { toast } from "react-toastify";
type message = {
  alert?: string;
};
const initialState: message = {};

const XoaPhimSlice = createSlice({
  name: "XoaPhim",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(XoaPhimThunk.fulfilled, (state, { payload }) => {
      state.alert = payload;
    });
    builder.addCase(XoaPhimThunk.rejected, () => {
      toast.done("Xóa phim thất bại");
    });
  },
});

export const {} = XoaPhimSlice.actions;

export default XoaPhimSlice.reducer;
