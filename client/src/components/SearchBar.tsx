import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AnimeItemI, IRootReducer } from '../types/Global';
import classes from './styles/SearchBar.module.scss'

interface SearchBarProps {
    placeholder: string
}

const SearchBar: React.FC<SearchBarProps> = ({placeholder}) => {
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState<string>('')
    const [this_placeholder, setPlaceholder] = useState<string>(placeholder)
    const [rootClasses, setRootClasses] = useState<string[]>([classes.search_form])
    const globalList = useSelector<IRootReducer, AnimeItemI[]>(state => state.globalList.animeList)

    const searchExactOrRedirect = () => {
        const searchResult = [...globalList].filter(item => 
            item.title.toLowerCase().includes(searchValue.toLowerCase())
        )
        if (searchResult.length === 1 && searchResult !== undefined) {
                const exactPage = searchResult[0].page_name
                return navigate(`/anime/${exactPage}`)
        }
        return navigate(`/search/?searchQuery=${searchValue}`)
    }

    const searchAnime = e => {
        e.preventDefault()

        if(searchValue === "") {
            setRootClasses([...rootClasses, classes.input_error])
            setPlaceholder('Введите название')
            return 
        }

        return searchExactOrRedirect()
    }

    return (
        <div>
            <form className={rootClasses.join(' ')}>
                <input value={searchValue} onChange={e => setSearchValue(e.target.value)} type="text" required placeholder={this_placeholder}/>
                <button onClick={searchAnime}/>
            </form>
        </div>
    );
};

export default SearchBar;