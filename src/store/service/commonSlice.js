import { createSlice } from "@reduxjs/toolkit";

const commonInitial = {
    selectMode: false,
    selectModePageName: null,
    subPathName: null,
};

const commonSlice = createSlice({
    name: "common",
    initialState: commonInitial,
    reducers: {
        handleSelectMode(state, action) {
            state.selectMode = action.payload.selectMode;
            state.selectModePageName = action.payload.selectModePageName;
        },
        setSubPathName(state, action) {
            state.subPathName = action.payload.subPathName;
        },
    },
});

export const { handleSelectMode, setSubPathName } = commonSlice.actions;

export const commonReducer = commonSlice.reducer;
