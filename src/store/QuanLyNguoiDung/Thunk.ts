import { createAsyncThunk } from "@reduxjs/toolkit";
import { quanLyNguoiDungService } from "services";
import { user } from "types/QuanLyNguoiDung";

export const LoginThunk = createAsyncThunk('quanlynguoidung/loginThunk',async(payload :user,{rejectWithValue}) =>{
    try {
        const data = await quanLyNguoiDungService.login(payload) 
        return data.data.content
    }
    catch(err) {
        return rejectWithValue(err)

    }
})
