import { createAsyncThunk } from "@reduxjs/toolkit";
import { quanLyNguoiDungService } from "services";
export const getLichSuDatVeThunk = createAsyncThunk(
  "QuanLyNguoiDung/LayThongTinLichSu",
  async (_, { rejectWithValue }) => {
    try {
      const USER = JSON.parse(localStorage.getItem("USER"));
      if (USER) {
        const res = await quanLyNguoiDungService.GetLichSuDatVe();
        return res.data.content;
      }
      return undefined;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
