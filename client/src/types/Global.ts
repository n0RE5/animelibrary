import React from "react";

/* 
    Options
*/
export type options = {
    optionName: any
}

export enum sortTypes {
    withName = "Названию",
    withDate = "Дате Выхода",
    withRating = "Рейтингу"
}

export enum animeStatus {
    statusDone = "Вышел",
    statusAnnounce = "Аннонс",
    statusOngoing = "Онгоинг"
}

export enum animeTypes {
    typeFilm = "Фильм",
    typeSitcom = "ТВ Сериал",
    typeSpecial = "Спешл",
    typeOVA = "OVA"
}

export enum animeGenres {
    genreDetective = "Детектив",
    genreHorror = "Хоррор"
}

/*
    Store
*/

export interface IRootReducer {
    userState: {
        isAuth: boolean,
        user: IUser,
        watchList: AnimeItemI[]
    }
    globalList: {
        animeList: AnimeItemI[]
    }
}

/* 
    User
*/
export interface IUser {
    id: number,
    email: string,
    role: string,
    watchlistId: number
} 


/* 
    Anime
*/

export interface AnimeStatsI {
    stat_name: string,
    stat_value: string,
    stat_htmlTag: string,
    stat_link: string
}

export interface AnimeItemI {
    id: number,
    page_name: string,
    img: string,
    title: string,
    rating: number,
    japanese_title: string,
    japan_title: string,
    gallery_1: string,
    gallery_2: string,
    gallery_3: string,
    gallery_4: string,
    video: string,
    status: string,
    type: string, 
    year: string, 
    genres: string,
    description: string,
    stats: AnimeStatsI[]
}