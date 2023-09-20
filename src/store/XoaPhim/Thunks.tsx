import { createAsyncThunk } from "@reduxjs/toolkit";
import { QuanLyPhimService } from "services";
// import { DataFilm } from "types/FormDataFilm";
// import { Ve } from "types/DanhSachVePhim";

export const XoaPhimThunk = createAsyncThunk(
  "quanLyPhim/XoaPhim",
  async (payload: any, { rejectWithValue }) => {
    try {
      const result = await QuanLyPhimService.delete(payload);
      return result.data.content;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
