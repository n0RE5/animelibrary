import React from 'react';
import { AnimeItemI } from '../types/Global';
import AnimeModal from './AnimeModal';
import TagsRenderer from './TagsRenderer';
import classes from './styles/AnimeItem.module.scss';
import { Link } from 'react-router-dom';

interface AnimeItemProps {
    animeItem: AnimeItemI
}

const AnimeItem: React.FC<AnimeItemProps> = ({animeItem}) => {
    return (
        <div className={classes.AnimeItem}>
            <AnimeModal animeItem={animeItem}/>
            <div className={classes.media_body}>
                    <Link to={`/anime/${animeItem.id}`} className={classes.AnimeItem_title}>{animeItem.title}</Link>
                    <div className={classes.AnimeItem_japanese_title}>{animeItem.japanese_title}</div>
                    <TagsRenderer animeItem={animeItem} />
                    <div className={classes.AnimeItem_description}>{animeItem.description}</div>
            </div>
        </div>
    );
};

export default AnimeItem;