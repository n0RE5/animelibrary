import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import WatchList from '../components/userComponents/WatchList';
import { getUserWatchlist } from '../http/watchlistAPI';
import { setAuth, setUser, setWatchlist } from '../store/userSlice';
import { AnimeItemI, IUser } from '../types/Global';
import classes from './styles/UserProfilePage.module.scss'

const account = (user: IUser) => {
    return(
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
    )
}

function UserProfilePage() {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const user: IUser = useSelector((state: any) => state.userState.user)
    const userWatchList: AnimeItemI[] = useSelector((state: any) => state.userState.watchList); 

    const logOut = () => {
        localStorage.removeItem('token')
        dispatch(setAuth(false))
        dispatch(setUser({}))
        dispatch(setWatchlist([]))
        navigate('/')
    }

    const [animeList, setAnimeList] = useState<AnimeItemI[]>(useSelector((state: any) => state.globalList.animeList));

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
                    <button onClick={() => setRenderedItem(account(user))} className={classes.switch_button}>Аккаунт</button>
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