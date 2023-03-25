import React from 'react';
import { AnimeItemI } from '../types/Global';
import AnimePoster from './UI/AnimePoster/AnimePoster';
import classes from './styles/AnimeScroller.module.scss'

interface AnimeScrollerProps {
    animeList: AnimeItemI[],
    children: React.ReactNode
}

const AnimeScroller: React.FC<AnimeScrollerProps> = ({children, animeList}) => {
    return (
    <div className={classes.ScrollPosters}>
        <div className="contain">
            <div className={classes.ScrollPosters_w}>
                <div className={classes.ScrollPosters_title}>
                    {children}
                </div>
                <div className={classes.ScrollPosters_items}>
                    {animeList.map(
                        (animeItem, index) => {
                            return <AnimePoster key={index} animeItem={animeItem}/>
                        }
                    )}
                </div>
            </div>
        </div>
      </div>
    );
};

export default AnimeScroller;