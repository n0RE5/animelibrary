import { AnimeStatsI } from "../types/Global"

export const parseAndSearchGenres = (genres: any, searchTarget: string) => {
    const searchedValue = genres.split(' ').filter((genre: any) => genre === searchTarget)
    if(searchedValue.length) {
        return true
    }
    return false
}

export const parseAndSearchStats = (stats: AnimeStatsI[], searchTarget: string) => {
    const searchedValue = [...stats].filter((stat: AnimeStatsI) => {
        if(stat.stat_value === searchTarget) {
            return stat.stat_value
        }
    })
    
    if(searchedValue.length) {
        return true
    }
    return false
}