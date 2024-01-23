import { createSlice } from "@reduxjs/toolkit";

const commonInitial = {
    selectMode: false,
    selectModePageName: null,
};

const commonSlice = createSlice({
    name: "common",
    initialState: commonInitial,
    reducers: {
        handleSelectMode(state, action) {
            state.selectMode = action.payload.selectMode;
            state.selectModePageName = action.payload.selectModePageName;
        },
    },
});

export const { handleSelectMode } = commonSlice.actions;

export const commonReducer = commonSlice.reducer;
