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
    selectedRelationList: [],
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
        setSelectedRelationList(state, action) {
            const itemId = action.payload.followRelation._id;
            const isSelected = state.selectedRelationList.find(
                (item) => item._id === itemId
            );

            if (isSelected) {
                state.selectedRelationList = state.selectedRelationList.filter(
                    (item) => item._id !== itemId
                );
            } else {
                state.selectedRelationList.push(action.payload.followRelation);
            }
        },
        resetSelectedRelationList(state) {
            state.selectedRelationList = [];
        },
    },
});

export const {
    getList,
    getListSuccess,
    setSelectedRelationList,
    resetSelectedRelationList,
} = followRelationSlice.actions;

export const followRelationReducer = followRelationSlice.reducer;
