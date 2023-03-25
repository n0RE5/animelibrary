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
import { MAIN_LIST_ID, SEASON_LIST_ID } from '../utils/consts';

function MainPage() {
    const dispatch = useDispatch()
    const [animeList, setAnimeList] = useState<AnimeItemI[]>([])
    const [seasonList, setSeasonList] = useState<AnimeItemI[]>([])

    const [fetchAnimeList] = useFetching( async () => {
        const animelist = await getAnimeFromList(MAIN_LIST_ID)
        setAnimeList(animelist)
    })

    const [fetchWinterList] = useFetching( async () => {
        const seasonlist = await getAnimeFromList(SEASON_LIST_ID)
        setSeasonList(seasonlist)
    })

    useEffect(() => {
        if(!seasonList.length) {
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
                <AnimeScroller animeList={seasonList}>Аниме зимнего сезона</AnimeScroller>
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