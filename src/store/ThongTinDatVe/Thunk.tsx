import { createAsyncThunk } from "@reduxjs/toolkit";
import { QuanLyDatVeService } from "services";
import { Ve } from "types/DanhSachVePhim";

export const DatVeThunk = createAsyncThunk(
  "quanlydatve/DatVe",
  async (payload: Ve, { rejectWithValue }) => {
    try {
      const result = await QuanLyDatVeService.datVe(payload);
      return result.data.content;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
