import { createAsyncThunk } from "@reduxjs/toolkit";
import { QuanLyDatVeService } from "../../services/QuanLyDatVe";
export const getVePhim = createAsyncThunk(
  "QuanLyVeDat/LayDanhSachVe",
  async (maLichChieu: string, { rejectWithValue }) => {
    try {
      const result = await QuanLyDatVeService.getDanhSachPhongVe(maLichChieu);
      // await new Promise((resolve) => setTimeout(resolve, 1000));
      return result.data.content;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
