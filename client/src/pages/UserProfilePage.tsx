import React, { memo, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AnimeSort from '../components/AnimeSort';
import AnimePoster from '../components/UI/AnimePoster/AnimePoster';
import WatchListPoster from '../components/UI/WatchListPoster/WatchListPoster';
import WatchList from '../components/UserProfileComponents/WatchList';
import { check } from '../http/userAPI';
import { getUserWatchlist } from '../http/watchlistAPI';
import { AnimeItemI, IUser } from '../types/Global';
import classes from './styles/UserProfilePage.module.scss'

function UserProfilePage() {

    const dispatch = useDispatch();
    const user: IUser = useSelector((state: any) => state.userState.user)
    const navigate = useNavigate()
    const userWatchList: AnimeItemI[] = useSelector((state: any) => state.userState.watchList); 

    const logOut = () => {
        localStorage.removeItem('token')
        dispatch({type: "SET_IS_AUTH", payload: false})
        dispatch({type: "SET_USER", payload: {}})
        dispatch({type: "SET_WATCHLIST", payload: []})
        navigate('/')
    }

    const [animeList, setAnimeList] = useState<AnimeItemI[]>(useSelector((state: any) => state.globalList.animeList));

    const loadUserWatchList = async (user) => {
        const watchList = await getUserWatchlist(user.watchlistId)
        dispatch({type: "SET_WATCHLIST", payload: watchList})
    }

    useEffect(() => setAnimeList([...animeList]), [userWatchList])
    useEffect(() => { loadUserWatchList(user) }, [])

    const account =
    <div className={classes.UPP_body}>
        <div className={classes.media_info}>
            <div className={classes.media_info_title}>Настройки аккаунта</div>
            <div className={classes.media_info_description}>Здесь вы можете настроить дополнительные параметры для своего аккаунта</div>
            <hr />
        </div>
        <div className={classes.settings}>
            <div className={classes.settings_flex}>
                <span>Логин (email)</span>
                <div>{user.email}</div>
            </div>
            <div className={classes.settings_flex}>
                <span>Пароль </span>
                <div>********</div>
            </div>
        </div>
    </div>

    const [renderedItem, setRenderedItem] = useState<any>(<WatchList/>)

    return (
        <div className="extra_contain">
            <div className={classes.UPP_w}>
                <div className={classes.UPP_sidebar}>
                    <div className={classes.sidebar_title}>Настройки</div>
                    <button onClick={() => setRenderedItem(<WatchList/>)} className={classes.switch_button}>Мои Аниме</button>
                    <button onClick={() => setRenderedItem(account)} className={classes.switch_button}>Аккаунт</button>
                    {user.role === 'ADMIN' 
                    ? <button onClick={() => navigate('/admin')} className={classes.switch_button}>Админпанель</button>
                    : null
                    }
                    <button onClick={() => logOut()} className={classes.switch_button}>Выйти</button>
                </div>
                {renderedItem}
            </div>
        </div>
    );
};

export default UserProfilePage;