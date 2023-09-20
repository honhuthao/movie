import { createAsyncThunk } from "@reduxjs/toolkit";
import { QuanLyPhimService } from "services";

export const CapNhatPhimThunk = createAsyncThunk(
  "QuanLyPhim/CapNhatphim",
  async (payload: any, { rejectWithValue }) => {
    try {
      const result = await QuanLyPhimService.capNhatphim(payload);
      //   await new Promise((resolve) => setTimeout(resolve, 1000));
      return result.data.content;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
