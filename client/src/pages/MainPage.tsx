import AnimeList from '../components/AnimeList';
import AnimeScroller from '../components/AnimeScroller';
import SearchBar from '../components/SearchBar';
import AnimeFilter from '../components/AnimeFilter';
import classes from './styles/MainPage.module.scss'
import { useSelector } from 'react-redux';

function MainPage() {
    const animeList = useSelector((state: any) => state.globalList.animeList)
    const winterList = useSelector((state: any) => state.winterList.winterList)

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