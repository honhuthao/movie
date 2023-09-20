import { createAsyncThunk } from "@reduxjs/toolkit";
import { QuanLyRapService } from "services/QuanLyHeThongRap";
export const getThongTinRap = createAsyncThunk(
  "QuanLyRap/LayThongTinCumRap",
  async (_, { rejectWithValue }) => {
    try {
      const res = await QuanLyRapService.getHethongRap();
      return res.data.content;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
