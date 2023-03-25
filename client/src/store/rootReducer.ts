import { combineReducers } from "@reduxjs/toolkit";
import globalListSlice from "./globalListSlice";
import userSlice from "./userSlice";

const reducer = combineReducers({
    userState: userSlice,
    globalList: globalListSlice
})

export default reducer