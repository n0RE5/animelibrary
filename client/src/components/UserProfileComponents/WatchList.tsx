import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classes from '../../pages/styles/UserProfilePage.module.scss'
import { AnimeItemI } from '../../types/Global';
import AnimeSort from '../AnimeSort';
import WatchListPoster from '../UI/WatchListPoster/WatchListPoster';


const WatchList: React.FC = () => {
    //<AnimeSort animeList={animeList} setSortedList={setAnimeList} />
    const dispatch = useDispatch();
    const userWatchList: AnimeItemI[] = useSelector((state: any) => state.userState.watchList);

    const sortUserWatchlist = (sortedList: AnimeItemI) => {
        dispatch({type: "SET_WATCHLIST", payload: sortedList})
    }

    return (
        <div className={classes.UPP_body}>
            <div className={classes.media_info}>
                <div className={classes.media_info_title}>Список аниме</div>
                <div className={classes.media_info_description}>Вы отметили эти аниме как посмотреть позже</div>
                <hr />
                    <AnimeSort animeList={userWatchList} setSortedList={sortUserWatchlist} />
                <hr />
            </div>
            <div className={classes.anime_container}>
                {userWatchList.length
                ? userWatchList.map(anime =>
                    <WatchListPoster key={anime.id} animeItem={anime}/>)
                : <div className={classes.media_info_description}>Пока что список пустой.</div>
                }
            </div>
        </div>
    );
};

export default WatchList;