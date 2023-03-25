import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import WatchListPoster from '../../components/UI/WatchListPoster/WatchListPoster';
import AnimeSort from '../../components/AnimeSort';
import { AnimeItemI, IRootReducer } from '../../types/Global';
import { setWatchlist } from '../../store/userSlice';
import classes from '../styles/UserProfilePage.module.scss'


const WatchList: React.FC = () => {
    const dispatch = useDispatch()
    const userWatchList = useSelector<IRootReducer, AnimeItemI[]>(state => state.userState.watchList);

    const sortUserWatchlist = (sortedList) => {
        dispatch(setWatchlist(sortedList))
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