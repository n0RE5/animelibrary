import { AnimeItemI } from "../types/Global";
import { $authHost, $host } from "./index";

export const createAnime = async (anime) => {
    const response = await $authHost.post('api/anime', anime)
    return response
}

export const getAnime = async(id: string) => {
    const response = await $host.get(`api/anime/${id}`)
    return response
}

export const destroyAnime = async(id: number) => {
    const response = await $authHost.post(`api/anime/${id}`)
    return response
}

export const getAnimeList = async (limit: number, page: number) => {
    const response = await $host.get(`api/anime?limit=${limit}&page=${page}`)
    return response
}

export const createAnimeList = async (name: string) => {
    const response = await $authHost.post('api/animeList', {name})
    return response
}

export const insertAnimeListItem = async (animeListId: number, animeItemId: number) => {
    const response = await $authHost.post(`api/animeListItem`, {animelistId: animeListId, animeitemId: animeItemId})
    return response
}

export const removeAnimeListItem = async(id: number) => {
    const response = await $authHost.post(`api/animeListItem/${id}`)
    return response
}

export const getAnimeFromList = async (animeListId) => {
    const response = await $host.get(`api/animeListItem/${animeListId}`)
    response.data.rows.filter(item => item.animeitem.id !== null)
    return response.data.rows.map(item => item.animeitem)
}