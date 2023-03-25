import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { optionsAnimeGenres, optionsAnimeRating, optionsAnimeStatus, optionsAnimeTypes, optionsAnimeYears } from '../utils/Options';
import classes from './styles/AnimeFilter.module.scss'
import CustomSelect from './UI/CustomSelect/CustomSelect';

const AnimeFilter: React.FC = () => {
    const navigate = useNavigate()
    const [params] = useSearchParams()
    const [animeType, setAnimeType] = useState<string>('') 
    const [genre, setGenre] = useState<string>('')
    const [status, setStatus] = useState<string>('') 
    const [rating, setRating] = useState<string>('')
    const [year, setYear] = useState<string>('') 
    const searchQuery = params.get("searchQuery") || ""

    const gotoSearchPage = () => {
        navigate(`/search/?type=${animeType}&genre=${genre}&status=${status}&rating=${rating}&year=${year}&searchQuery=${searchQuery}`)
    }

    return (
        <div className={classes.AnimeFilter}>
            <div className={classes.AnimeFilter_w}>
                <div className={classes.block_header}>
                    <span>Фильтр</span>
                </div>
                <div className={classes.block_body}>
                    <div className={classes.block}>
                        <div className={classes.divider}><strong>Тип</strong></div> 
                        <CustomSelect output={animeType} setOutput={setAnimeType} technicalName='selectType' placeholder='Выберите тип' optionArray={optionsAnimeTypes} />
                    </div>
                    <div className={classes.block}>
                        <div className={classes.divider}><strong>Жанры</strong></div> 
                        <CustomSelect output={genre} setOutput={setGenre} technicalName='selectGenre' placeholder='Выберите жанр' optionArray={optionsAnimeGenres} />
                    </div>
                    <div className={classes.block}>
                        <div className={classes.divider}><strong>Статус</strong></div> 
                        <CustomSelect output={status} setOutput={setStatus} technicalName='selectStatus' placeholder='Выберите статус' optionArray={optionsAnimeStatus} />
                    </div>
                    <div className={classes.block}>
                        <div className={classes.divider}><strong>Рейтинг</strong></div>
                        <CustomSelect output={rating} setOutput={setRating} technicalName='selectRating' placeholder='Выберите рейтинг' optionArray={optionsAnimeRating} />
                    </div> 
                    <div className={classes.block}>
                        <div className={classes.divider}><strong>Год</strong></div> 
                        <CustomSelect output={year} setOutput={setYear} technicalName='selectYear' placeholder='Выберите год' optionArray={optionsAnimeYears} />
                    </div>
                    <button onClick={gotoSearchPage} className={classes.AnimeFilter_btn}>Искать</button>
                </div>
            </div>
        </div>
    );
};

export default AnimeFilter;