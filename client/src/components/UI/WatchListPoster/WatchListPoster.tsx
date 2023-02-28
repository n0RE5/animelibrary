import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromUserWatchlist } from '../../../http/watchlistAPI';
import { setWatchlist } from '../../../store/userSlice';
import { AnimeItemI, IRootReducer, IUser } from '../../../types/Global';
import AnimePoster from '../AnimePoster/AnimePoster';
import classes from './WatchListPoster.module.scss'

interface WatchListPosterProps {
    animeItem: AnimeItemI
}

const WatchListPoster: React.FC<WatchListPosterProps> = ({animeItem}) => {
    const [visible, setVisible] = useState<boolean>(false)
    const dispatch = useDispatch();
    const user = useSelector<IRootReducer, IUser>(state => state.userState.user);
    const watchList = useSelector<IRootReducer, AnimeItemI[]>(state => state.userState.watchList)

    const rootClasses = [classes.watchlist_remove]

    if(visible) {
        rootClasses.push(classes.visible)
    }

    const openButton = () => {
        setVisible(true)
    }

    const closeButton = () => {
        setVisible(false)
    }

    const filterWatchList = (id) => {
        const filtered = [...watchList].filter(item => item.id !== id)
        return dispatch(setWatchlist(filtered))
    }

    const removeAnime = async () => {
        try {
            const res = await removeFromUserWatchlist(user.watchlistId, animeItem.id)
            filterWatchList(animeItem.id)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div 
            className={classes.posterHover}
            onMouseEnter={openButton}
            onMouseLeave={closeButton}
        >
            <AnimePoster key={animeItem.page_name} animeItem={animeItem} large/>
            <a onClick={removeAnime} className={rootClasses.join(' ')}><span></span></a>
        </div>    
    );
};

export default WatchListPoster;