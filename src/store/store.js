import { configureStore } from "@reduxjs/toolkit";
import homeReducer from './slicer/HomeSlice';

export const store = configureStore({
    reducer:{
        home:homeReducer
    }
});