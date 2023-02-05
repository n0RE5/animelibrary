const winterList = {
    winterList: []
}/*
    temp
*/

export const winteListReducer = (state = winterList, action: any) => {
    switch(action.type) {
        case "SET_WINTER_LIST":
            return {...state, winterList: action.payload}
        default:
            return state
    }
}

