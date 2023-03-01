import { createSlice } from "@reduxjs/toolkit";

export const HomeSlice = createSlice({
    name:'home',
    initialState: {
        url:{},
        genres:{},
      
    },
    reducers: {
        getApiConfigurations : (state,action) => {
            state.url = action.payload
        },
        getGenres : (state,action) => {
            state.genres=action.payload
        },

    }
});

export default HomeSlice.reducer;

export const {getApiConfigurations,getGenres} = HomeSlice.actions;