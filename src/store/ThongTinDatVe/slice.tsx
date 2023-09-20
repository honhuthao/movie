import { createSlice } from "@reduxjs/toolkit";
import { DatVeThunk } from "./Thunk";
type ThongTinVeDat = {
  message?: string;
  isLoading: boolean;
  tabAtive: string;
};
const initialState: ThongTinVeDat = {
  isLoading: false,
  tabAtive: "1",
};
const DatVeSlice = createSlice({
  name: "DatVe",
  initialState,
  reducers: {
    chuyenTab(state, { payload }) {
      state.tabAtive = payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(DatVeThunk.fulfilled, (state, { payload }) => {
      state.message = payload;
      state.isLoading = false;
    });
    builder.addCase(DatVeThunk.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(DatVeThunk.pending, (state) => {
      state.isLoading = true;
    });
  },
});

export const { chuyenTab } = DatVeSlice.actions;

export default DatVeSlice.reducer;
