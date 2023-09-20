import { createAsyncThunk } from "@reduxjs/toolkit";
import { QuanLyRapService } from "services/QuanLyHeThongRap";
export const getCumRap = createAsyncThunk(
  "QuanLyRap/LayThongTinHeThongRap",
  async (_, { rejectWithValue }) => {
    try {
      const res = await QuanLyRapService.getCumRapTheoHeThong();
      return res.data.content;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
