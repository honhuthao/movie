import { createSlice } from '@reduxjs/toolkit'
import { LoginThunk } from './Thunk';
import { user } from 'types/QuanLyNguoiDung';
type QuanLyNguoiDung = {
  user? :user,
  isLoading? : boolean
}
const initialState :QuanLyNguoiDung = {
   user : JSON.parse(localStorage.getItem('USER')) ,
   isLoading :false
}

const quanLyNguoiDungReducer = createSlice({
  name: 'quanlynguoidung',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(LoginThunk.fulfilled,(state,{payload}) =>{
      state.user = payload  
      state.isLoading = false
      if (payload) {
        localStorage.setItem('USER',JSON.stringify(payload))
      }
    })

  }
});

export const {} = quanLyNguoiDungReducer.actions

export default quanLyNguoiDungReducer.reducer