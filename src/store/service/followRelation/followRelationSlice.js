import { createSlice } from "@reduxjs/toolkit";

const followRelationState = {
    // instagram: {
    //     isRegister: false,
    //     list: [],
    // },
    // youtube: {
    //     isRegister: false,
    //     list: [],
    // },
    accountStatus: "empty",
    list: [],
    loadStatus: "ready",
};
const followRelationSlice = createSlice({
    name: "followRelation",
    initialState: followRelationState,
    reducers: {
        getList(state) {
            state.loadStatus = "pending";
        },
        getListSuccess(state, action) {
            const { accountStatus, list } = action.payload;
            console.log("action.payload:", action.payload);
            console.log("accountStatus", accountStatus);
            state.accountStatus = accountStatus;
            state.list = list;
            state.loadStatus = "end";
        },
    },
});

export const { getList, getListSuccess } = followRelationSlice.actions;

export const followRelationReducer = followRelationSlice.reducer;
