import React, { useEffect, useState } from 'react';
import { optionsSortTypes } from '../utils/Options';
import CustomSelect from './UI/CustomSelect/CustomSelect';
import classes from './styles/AnimeSort.module.scss'
import { AnimeItemI, sortTypes } from '../types/Global';

interface AnimeSortProps {
    animeList: AnimeItemI[]
    setSortedList: (arg0: any) => void
}

const AnimeSort: React.FC<AnimeSortProps> = ({animeList, setSortedList}) => {
    
    const [selectedSort, setSelectedSort] = useState<string>("Не сортировать")
    const optionsSortList = optionsSortTypes;

    const sortAnimeList = () => {
        if (selectedSort === sortTypes.withName) {
           return setSortedList([...animeList].sort((a: AnimeItemI, b: AnimeItemI) => a.title.toLocaleLowerCase().localeCompare(b.title.toLocaleLowerCase())))
        }
    
        if (selectedSort === sortTypes.withDate) {
           return setSortedList([...animeList].sort((a: AnimeItemI, b: AnimeItemI) => Number(b.year) - Number(a.year)))
        }
    
        if (selectedSort === sortTypes.withRating) {
            return setSortedList([...animeList].sort((a: AnimeItemI, b: AnimeItemI) => Number(b.rating) - Number(a.rating)))
        }
        return setSortedList([...animeList])
    }

    useEffect(() => sortAnimeList(), [selectedSort])

    return (
        <div className={classes.AnimeSort}>
            <div className={classes.left}>
                <span className={classes.AnimeSort_span}>Сортировать по:</span>
            </div>
            <div className={classes.right}>            
                <CustomSelect output={selectedSort} technicalName="selectSort" optionArray={optionsSortList} setOutput={setSelectedSort} placeholder='Не сортировать' />
            </div>
        </div>
    );
};

export default AnimeSort;