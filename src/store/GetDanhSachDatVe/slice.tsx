import { createSlice } from "@reduxjs/toolkit";
import { getVePhim } from "./Thunk";
import { DanhSachGhe, DanhSachVe, Ve } from "types/DanhSachVePhim";

type DanhSachVeDat = {
  danhSachVe?: DanhSachVe;
  isFetchListTicket: boolean;
  danhSachGheDangDat?: DanhSachGhe[];
  danhSachGheKhachDat?: any;
  GheThanhToan?: Ve;
};
const initialState: DanhSachVeDat = {
  isFetchListTicket: false,
  danhSachGheDangDat: [],
  danhSachGheKhachDat: [],
  GheThanhToan: { danhSachVe: [] },
};
const QuanLyVeDatSlice = createSlice({
  name: "QuanLyVeDat",
  initialState,
  reducers: {
    addGhe(state, { payload }) {
      const index = state.danhSachGheDangDat.findIndex(
        (item) => payload.maGhe === item.maGhe
      );
      if (index != -1) {
        state.danhSachGheDangDat.splice(index, 1);
      } else {
        state.danhSachGheDangDat.push(payload);
      }
    },
    buyTicket(state, { payload }) {
      state.GheThanhToan.maLichChieu = Number(payload.id);
      state.GheThanhToan.danhSachVe = payload.danhSachGheDangDat;
    },
    hoanTat(state) {
      state.danhSachGheDangDat = [];
    },
  },
  extraReducers(builder) {
    builder.addCase(getVePhim.fulfilled, (state, { payload }) => {
      state.danhSachVe = payload;
      state.isFetchListTicket = false;
    });
    builder.addCase(getVePhim.rejected, (state) => {
      state.isFetchListTicket = false;
    });
    builder.addCase(getVePhim.pending, (state) => {
      state.isFetchListTicket = true;
    });
  },
});

export const { addGhe, buyTicket, hoanTat } = QuanLyVeDatSlice.actions;

export default QuanLyVeDatSlice.reducer;
