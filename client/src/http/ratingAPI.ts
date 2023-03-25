import { $authHost, $host } from "./index";

export const rateAnime = async (rate, userId, animeitemId) => {
    const response = $authHost.post(`api/rating`, {rate, userId, animeitemId})
    return response
}

export const updateAnimeRating = async (animeitemId) => {
    const response = $host.get(`/api/rating/${animeitemId}`)
    return response
}