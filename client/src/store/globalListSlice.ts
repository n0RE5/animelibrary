import { createSlice } from "@reduxjs/toolkit";

const globalList = createSlice({
  name: "globalList",
  initialState: {
    animeList: []
  },
  reducers: {
    setGlobalList(state, action) {
      state.animeList = action.payload
    }
  }
})

export default globalList.reducer
export const {setGlobalList} = globalList.actions