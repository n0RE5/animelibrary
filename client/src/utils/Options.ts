import { animeGenres, animeStatus, animeTypes, options, sortTypes } from '../types/Global'

export const optionsSortTypes: options[] = [
    {optionName: sortTypes.withName},
    {optionName: sortTypes.withDate},
    {optionName: sortTypes.withRating},
]

export const optionsAnimeYears: options[] = []
export const optionsAnimeRating: options[] = []

export const optionsAnimeStatus: options[] = [
    {optionName: animeStatus.statusDone},
    {optionName: animeStatus.statusAnnounce},
    {optionName: animeStatus.statusOngoing},
]
export const optionsAnimeGenres: options[] = [
    {optionName: animeGenres.genreDetective},
    {optionName: animeGenres.genreHorror},
]
export const optionsAnimeTypes: options[] = [
    {optionName: animeTypes.typeFilm},
    {optionName: animeTypes.typeSitcom},
    {optionName: animeTypes.typeSpecial},
    {optionName: animeTypes.typeOVA},
]


const fillAnimeYears = () => {
    for (let i = 2023; i > 1950; i--) {
        optionsAnimeYears.push({optionName: i.toString()})
    }
}

const fillAnimeRating = () => {
    for (let i = 10; i > -1; i--) {
        optionsAnimeRating.push({optionName: i.toString()})
    }
}

fillAnimeYears()
fillAnimeRating()