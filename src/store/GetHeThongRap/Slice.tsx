import { createSlice } from "@reduxjs/toolkit";
import { getThongTinRap } from "./Thunk";
import { QuanLyRap } from "types/QuanLyRap";
type heThongRap = {
  heThong?: QuanLyRap[];
};
const initialState: heThongRap = {
  heThong: [],
};

const CumRapSlice = createSlice({
  name: "QuanLyRap",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getThongTinRap.fulfilled, (state, { payload }) => {
      state.heThong = payload;
    });
  },
});

export const {} = CumRapSlice.actions;

export default CumRapSlice.reducer;
