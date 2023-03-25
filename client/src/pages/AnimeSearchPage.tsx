import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { parseAndSearchGenres, parseAndSearchStats } from '../utils/typeParsers';
import AnimeFilter from '../components/AnimeFilter';
import AnimeList from '../components/AnimeList';
import AnimeSort from '../components/AnimeSort';
import SearchBar from '../components/SearchBar';
import { AnimeItemI, IRootReducer } from '../types/Global';
import classes from './styles/AnimeSearchPage.module.scss'

function AnimeSearchPage () {
    const globalList = useSelector<IRootReducer, AnimeItemI[]>(state => state.globalList.animeList)
    const [searchIsNull, setSearchIsNull] = useState<boolean>(false)
    const [searchParmas] = useSearchParams()

    const animeType = searchParmas.get('type')
    const genre = searchParmas.get('genre')
    const status = searchParmas.get('status')
    const rating = searchParmas.get('rating')
    const year = searchParmas.get('year')
    const searchQuery = searchParmas.get('searchQuery')

    const searchedList: AnimeItemI[] = [...globalList].filter(item => 
        (animeType? item.type === animeType : true) &&
        (genre? parseAndSearchGenres(item.genres, genre) : true) &&
        (rating? item.rating === Number(rating): true) &&
        (status? item.status === status : true) &&
        (year? item.year === year : true) &&
        (searchQuery? item.title.toLowerCase().includes(searchQuery.toLowerCase()): true)
    )

    const [filteredList, setFilteredList] = useState<AnimeItemI[]>(searchedList)

    useEffect(() => setFilteredList(searchedList), [searchQuery, animeType, genre, status, rating, year]);
    useEffect(() => {
        if(searchedList.length > 0) {
            return setSearchIsNull(false)
        }
        return setSearchIsNull(true)
    } , [filteredList])

    return (
        <div className="contain">
            {searchIsNull
                ?<div className={classes.NotFound}>
                    <div className={classes.NotFound_result}>Поиск "{searchQuery}"</div>
                    <SearchBar placeholder='Найти любимое аниме'/>
                    <div className={classes.NotFound_yellowBox}>
                        <div> -!- По вашему запросу "{searchQuery}" ничего не найдено.</div>
                        <div>Убедитесь что запрос был задан без ошибок.</div>
                        <div>Попробуйте изменить запрос или указать английское название аниме</div>
                        <div>Так же попробуйте изменить запросы в фильтре</div>
                    </div>
                </div>
                :<div className={classes.AnimeFilterResult_w}>
                        <AnimeList animeList={filteredList}>
                        <strong className={classes.strong}>Список аниме</strong>
                        <div className={classes.margin}>
                            <SearchBar placeholder='Поиск'/>
                        </div>
                        <hr className={classes.hr} />
                        <AnimeSort animeList={filteredList} setSortedList={setFilteredList} />
                        <hr className={classes.hr} />
                        </AnimeList>
                        <div className={classes.AnimeFilterResult_Filter}>
                            <AnimeFilter/>
                        </div>
                </div>
            }
        </div>
    );
};

export default AnimeSearchPage;