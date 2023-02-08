import AnimeList from '../components/AnimeList';
import AnimeScroller from '../components/AnimeScroller';
import SearchBar from '../components/SearchBar';
import AnimeFilter from '../components/AnimeFilter';
import classes from './styles/MainPage.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import { getAnimeFromList } from '../http/animeAPI';
import { useFetching } from '../hooks/useFetching';
import { useEffect, useState } from 'react';
import { AnimeItemI } from '../types/Global';

function MainPage() {
    const dispatch = useDispatch()
    const [animeList, setAnimeList] = useState<AnimeItemI[]>([])
    const winterList = useSelector((state: any) => state.winterList.winterList)

    const [fetchAnimeList, isAnimeLoading, error] = useFetching( async () => {
        const animelist = await getAnimeFromList(process.env.REACT_APP_MAIN_LIST)
        setAnimeList(animelist)
    })

    const [fetchWinterList, isWinterListLoading, err] = useFetching( async () => {
        const winterList = await getAnimeFromList(process.env.REACT_APP_SEASON_LIST)
        return dispatch({type: "SET_WINTER_LIST", payload: winterList})
    })

    useEffect(() => {
        if(!winterList.length) {
            fetchWinterList()
        }
        if(!animeList.length) {
            fetchAnimeList()
        }
    }, [])

    return (
        <div className={classes.MainPage_w}>
            <div className={[classes.MainPage_Searchbar, "contain"].join(' ')}>
                <SearchBar placeholder='Найти любимое аниме'/>
            </div>
            <div className={classes.AnimeScroller_divider}>
                <AnimeScroller animeList={winterList}>Аниме зимнего сезона</AnimeScroller>
            </div>
            <div className="contain">
                <div className={classes.__flex}>
                    <AnimeList animeList={animeList}>
                        <div className={classes.AnimeList_title}>Новые аниме на сайте</div>
                    </AnimeList>
                    <div className={classes.AnimeList_filter}>
                        <AnimeFilter />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainPage;