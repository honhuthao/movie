import { createAsyncThunk } from "@reduxjs/toolkit";
import { QuanLyPhimService } from "services";

export const getListFilmThunk = createAsyncThunk('QuanLyPhim/LayDanhSachPhim',async(tenPhim:string ,{rejectWithValue}) => {
     try {
        const result = await QuanLyPhimService.getAllList(tenPhim);
        await new Promise((resolve) =>  setTimeout(resolve,1000))
        return result.data.content
     }
     catch(err) {
        return rejectWithValue(err)
     }
})
