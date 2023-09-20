import { createAsyncThunk } from "@reduxjs/toolkit";
import { AccountSchemaType } from "schema";
import { quanLyNguoiDungService } from "services";

export const upDateThunk = createAsyncThunk(
  "quanlynguoidung/upDateThunk",
  async (payload: AccountSchemaType, { rejectWithValue }) => {
    try {
      const data = await quanLyNguoiDungService.updateUser(payload);
      return data.data.content;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
