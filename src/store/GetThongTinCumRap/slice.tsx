import { createSlice } from "@reduxjs/toolkit";
import { getCumRap } from "./Thunk";
import { heThongRapChieu } from "types/HeThongRap";
type cumRap = {
  heThongRapChieu?: heThongRapChieu[];
};
const initialState: cumRap = {
  heThongRapChieu: [],
};

const quanLyRapSlice = createSlice({
  name: "HeThongCumRap",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getCumRap.fulfilled, (state, { payload }) => {
      state.heThongRapChieu = payload;
    });
  },
});

export const {} = quanLyRapSlice.actions;

export default quanLyRapSlice.reducer;
