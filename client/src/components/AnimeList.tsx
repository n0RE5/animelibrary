import React from 'react';
import { AnimeItemI } from '../types/Global';
import AnimeListItem from './AnimeItem';
import classes from './styles/AnimeList.module.scss'

interface AnimeListProps {
    animeList: AnimeItemI[],
    children?: React.ReactNode;
}

const AnimeList: React.FC<AnimeListProps> = ({animeList, children}) => {
    return (
        <div className={classes.AnimeList}>
            <div className={classes.AnimeList_children}>{children}</div>
            {animeList.map(
                (animeItem, index) =>
                <AnimeListItem key={index} animeItem={animeItem}/>
            )}
        </div>
    );
};

export default AnimeList;