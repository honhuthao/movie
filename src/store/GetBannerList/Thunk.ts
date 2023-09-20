import { createAsyncThunk } from "@reduxjs/toolkit";
import { QuanLyPhimService } from "services";

export const getBannerList = createAsyncThunk('QuanLyPhim/LayDanhSachBanner',async(_,{rejectWithValue}) => {
    try {
       const result = await QuanLyPhimService.getBannerList();
       await new Promise((resolve) =>  setTimeout(resolve,1000))
       return result.data.content
    }
    catch(err) {
       return rejectWithValue(err)
    }
 })