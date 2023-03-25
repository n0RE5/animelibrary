import React from 'react';
import { Link } from 'react-router-dom';
import { AnimeItemI } from '../types/Global';
import classes from './styles/TagsRenderer.module.scss'

interface TagsRendererProps {
    animeItem: AnimeItemI
    renderPassiveTags?: boolean
}

const TagsRenderer: React.FC<TagsRendererProps> = ({animeItem, renderPassiveTags = true}) => {
    return (
        <div className={classes.TagsRenderer_tags}>
            <span>
                <Link to={`/search/?type=${animeItem.type}`}>{animeItem.type}</Link>
            </span>
            <span className={classes.differ}>/</span>
            <span>
                <Link to={`/search/?year=${animeItem.year}`}>{animeItem.year}</Link>
            </span>
            {renderPassiveTags && animeItem.genres.length
                ?   <span className={classes.tags}>
                        <span className={classes.differ}>/</span>
                        {animeItem.genres.split(' ').map(
                            (genre, index) =>
                                <Link key={index} to={`/search/?genre=${genre}`} className={classes.differ_right}>{genre}</Link>
                        )}
                    </span>
                : null
            }
        </div>
    );
};


export default TagsRenderer;