import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: "userState",
    initialState: {
        isAuth: false,
        user: {},
        watchList: []
    },
    reducers: {
        setAuth(state, action) {
            state.isAuth = action.payload
        },
        setUser(state, action) {
            state.user = action.payload
        },
        setWatchlist(state, action) {
            state.watchList = action.payload
        }
    }
})

export default userSlice.reducer
export const {setAuth, setUser, setWatchlist} = userSlice.actions