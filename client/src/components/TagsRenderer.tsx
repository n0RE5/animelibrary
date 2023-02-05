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
            <Link to={`/search/?type=${animeItem.type}`}>{animeItem.type}</Link>
            <span className={classes.differ}>/</span>
            <Link to={`/search/?year=${animeItem.year}`}>{animeItem.year}</Link>
            {renderPassiveTags && animeItem.genres.length
                ?   <div className={classes.tags}>
                        <span className={classes.differ}>/</span>
                        {animeItem.genres.split(' ').map(
                            (genre, index) =>
                                <Link key={index} to={`/search/?genre=${genre}`} className={classes.differ_right}>{genre}</Link>

                        )}
                    </div>
                : null
            }
        </div>
    );
};


export default TagsRenderer;