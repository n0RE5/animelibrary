import { combineReducers } from "redux";
import { allAnimeListReducer } from "./allAnimeListReducer";
import { userReducer } from "./userReducer";
import { winteListReducer } from "./winterListReducer";

const reducer = combineReducers({
    winterList: winteListReducer,
    userState: userReducer,
    globalList: allAnimeListReducer
})

export default reducer