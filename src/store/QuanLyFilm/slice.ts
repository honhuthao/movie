import { createSlice } from '@reduxjs/toolkit'
import { getListFilmThunk } from './Thunk';
import { ListFilm } from 'types/QuanLyPhim';
type DanhSachPhim = {
    listFilm?:ListFilm[],
    isFetchMovie : boolean,
    
}
const initialState :DanhSachPhim = {
  listFilm: [],
  isFetchMovie : false,
  
}

const quanLyPhimSlice = createSlice({
  name: 'QuanLyPhim',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getListFilmThunk.pending,(state) => {
      state.isFetchMovie = true
  })
    builder.addCase(getListFilmThunk.fulfilled,(state,{payload}) => {
        state.listFilm = payload
        state.isFetchMovie = false

    })
    builder.addCase(getListFilmThunk.rejected,(state) => {
      state.isFetchMovie = false  
    })
  },


});

export const {} = quanLyPhimSlice.actions

export default quanLyPhimSlice.reducer