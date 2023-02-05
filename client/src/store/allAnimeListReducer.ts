const allAnimeList = {
    animeList: []
} 
  
/*
    temp
*/

export const allAnimeListReducer = (state = allAnimeList, action: any) => {
    switch(action.type) {
      case "SET_GLOBAL_LIST":
        return {...state, animeList: action.payload}
      default:
        return state;
    }
  };