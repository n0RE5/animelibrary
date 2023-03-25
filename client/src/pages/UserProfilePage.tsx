import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import WatchList from './UserPages/WatchList';
import { getUserWatchlist } from '../http/watchlistAPI';
import { setAuth, setUser, setWatchlist } from '../store/userSlice';
import { AnimeItemI, IRootReducer, IUser } from '../types/Global';
import classes from './styles/UserProfilePage.module.scss'
import Account from './UserPages/Account';

function UserProfilePage() {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const user = useSelector<IRootReducer, IUser>(state => state.userState.user)
    const userWatchList = useSelector<IRootReducer, AnimeItemI[]>(state => state.userState.watchList); 
    const [animeList, setAnimeList] = useState<AnimeItemI[]>(useSelector<IRootReducer, AnimeItemI[]>(state => state.globalList.animeList));

    const logOut = () => {
        localStorage.removeItem('token')
        dispatch(setAuth(false))
        dispatch(setUser({}))
        dispatch(setWatchlist([]))
        navigate('/')
    }

    const loadUserWatchList = async (user) => {
        const watchList = await getUserWatchlist(user.watchlistId)
        dispatch(setWatchlist(watchList))
    }

    useEffect(() => setAnimeList([...animeList]), [userWatchList])
    useEffect(() => { 
        loadUserWatchList(user) 
    }, [])

    const [renderedItem, setRenderedItem] = useState<any>(<WatchList/>)

    return (
        <div className="extra_contain">
            <div className={classes.UPP_w}>
                <div className={classes.UPP_sidebar}>
                    <div className={classes.sidebar_title}>Настройки</div>
                    <button onClick={() => setRenderedItem(<WatchList/>)} className={classes.switch_button}>Мои Аниме</button>
                    <button onClick={() => setRenderedItem(<Account/>)} className={classes.switch_button}>Аккаунт</button>
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