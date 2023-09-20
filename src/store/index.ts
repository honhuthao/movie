import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";
import { useDispatch } from "react-redux";
import { getLichSuDatVeThunk } from "./GetLichSuVeDat/Thunk";

export const store = configureStore({
    reducer : rootReducer
})
store.dispatch(getLichSuDatVeThunk())

export type RootState = ReturnType<(typeof store['getState'])>
type AppDispatch = typeof store['dispatch']
export const useAppDispatch : () => AppDispatch = useDispatch