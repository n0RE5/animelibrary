import React from 'react';
import { Link } from 'react-router-dom';
import { AnimeItemI } from '../../../types/Global';
import TagsRenderer from '../../TagsRenderer';
import BannerImage from '../BannerImage/BannerImage';
import classes from './AnimePoster.module.scss'

interface AnimePosterProps {
    animeItem: AnimeItemI,
    large?: boolean
}

const AnimePoster: React.FC<AnimePosterProps> = ({animeItem, large}) => {
    return (
        <div>
            {large
            ? <div>
                <div className={classes.AnimePoster_img_w_wide}>
                    <BannerImage link={`/anime/${animeItem.id}`} src={process.env.REACT_APP_API_URL + animeItem.img} />
                </div>
                <div className={classes.AnimePoster_w_wide}>
                    <span className={classes.AnimePoster_jp}>{animeItem.japanese_title}</span>
                    <Link to={`/anime/${animeItem.id}`} className={[classes.AnimePoster_title_wide, classes.large].join(' ')}>{animeItem.title}</Link>
                    <TagsRenderer animeItem={animeItem} renderPassiveTags={false} />
                </div>
            </div>
            : <div>
                <div className={classes.AnimePoster_img_w}>
                    <BannerImage link={`/anime/${animeItem.id}`} src={process.env.REACT_APP_API_URL + animeItem.img} />
                </div>
                <div className={classes.AnimePoster_w}>
                    <Link to={`/anime/${animeItem.id}`} className={classes.AnimePoster_title}>{animeItem.title}</Link>
                </div>
            </div>
            }
        </div>
    );
};

export default AnimePoster;