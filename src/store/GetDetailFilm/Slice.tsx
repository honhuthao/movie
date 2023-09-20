import { createSlice } from "@reduxjs/toolkit";
import { DetailFilm } from "types/DetailFilm";
import { getDetailFilm } from "./Thunk";
type Detail = {
  DetailFilm?: DetailFilm;
  isFetchDetail: boolean;
};
const initialState: Detail = {
  isFetchDetail: false,
};

const getDetailFilmSlice = createSlice({
  name: "LayThongTinChiTiet",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getDetailFilm.fulfilled, (state, { payload }) => {
      state.DetailFilm = payload;
      state.isFetchDetail = false;
    });
    builder.addCase(getDetailFilm.pending, (state) => {
      state.isFetchDetail = true;
    });
    builder.addCase(getDetailFilm.rejected, (state) => {
      state.isFetchDetail = false;
    });
  },
});

export const {} = getDetailFilmSlice.actions;

export default getDetailFilmSlice.reducer;
