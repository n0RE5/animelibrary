const UserStates = {
    isAuth: false,
    user: {},
    watchList: []
}

export const userReducer = (state = UserStates, action: any) => {
    switch(action.type) {
        case "SET_IS_AUTH":
            return {...state, isAuth: action.payload}
        case "SET_WATCHLIST":
            return {...state, watchList: action.payload}
        case "SET_USER":
            return {...state, user: action.payload}
        default:
            return state
    }
}

