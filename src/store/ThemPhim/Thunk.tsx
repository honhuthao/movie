import { createAsyncThunk } from "@reduxjs/toolkit";
import { QuanLyPhimService } from "services";
// import { Ve } from "types/DanhSachVePhim";

export const ThemPhimThunk = createAsyncThunk(
  "quanLyPhim/ThemPhim",
  async (payload: any, { rejectWithValue }) => {
    try {
      const result = await QuanLyPhimService.themPhimUpHinh(payload);
      return result.data.content;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
