import { $authHost } from "./index";

export const watchlist_get = async (userId: number) => {
    const response: any = $authHost.get(`api/watchlist/get/${userId}`)
    return response.data.id
}

export const addToUserWatchlist = async (userWatchlistId: number, animeItemId: number) => {
    const response = await $authHost.post(`api/watchlist`, {userWatchlistId: userWatchlistId, animeitemId: animeItemId})
    return response
}

export const removeFromUserWatchlist = async(userWatchlistId: number, animeItemId: number) => {
    const response: any = await $authHost.post(`api/watchlist/remove`, {userWatchlistId: userWatchlistId, animeitemId: animeItemId})
    console.log(response)
    return response
}

export const getUserWatchlist = async (userWatchlistId: number) => {
    const response: any = await $authHost.get(`api/watchlist/${userWatchlistId}`)
    return response.data.rows.map(item => item.animeitem)
}