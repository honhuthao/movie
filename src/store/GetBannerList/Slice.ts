import { createSlice } from '@reduxjs/toolkit'
import {getBannerList} from './Thunk'
import { Banner } from 'types/QuanLyPhim';
type DanhSachBanner = {
    listBanner?:Banner[],
}
const initialState :DanhSachBanner = {
listBanner: [],
  
}

const getBannerSlice = createSlice({
  name: 'QuanLyPhim',
  initialState,
  reducers: {},
  extraReducers(builder) {
   
    builder.addCase(getBannerList.fulfilled,(state,{payload}) => {
        state.listBanner = payload
    })
  },


});

export const {} = getBannerSlice.actions

export default getBannerSlice.reducer