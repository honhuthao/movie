import { createSlice } from "@reduxjs/toolkit";
import { upDateThunk } from "./Thunk";

const initialState = {
  thongTinCapNhat: null,
  isLoading: false,
};

const CapNhatNguoiDungSlice = createSlice({
  name: "CapNhatNguoiDung",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(upDateThunk.fulfilled, (state, { payload }) => {
      state.thongTinCapNhat = payload;
      state.isLoading = false;
      alert("Cập nhật thành công");
    });
    builder.addCase(upDateThunk.pending, (state) => {
      state.isLoading = true;
    });
  },
});

export const {} = CapNhatNguoiDungSlice.actions;

export default CapNhatNguoiDungSlice.reducer;
