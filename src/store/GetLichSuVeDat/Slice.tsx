import { createSlice } from "@reduxjs/toolkit";
import { getLichSuDatVeThunk } from "./Thunk";
import { LichSuVeDat } from "types/LichSuDatVe";
type lichSuVe = {
  LichSuDatVe?: LichSuVeDat;
  isLoaingInTabs?: boolean;
};
const initialState: lichSuVe = {
  isLoaingInTabs: false,
};
const LichSuVeSlice = createSlice({
  name: "LayThongTinLichSuVeDat",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getLichSuDatVeThunk.fulfilled, (state, { payload }) => {
      if (payload) {
        state.LichSuDatVe = payload;
      }
    });
  },
});

export const {} = LichSuVeSlice.actions;

export default LichSuVeSlice.reducer;
