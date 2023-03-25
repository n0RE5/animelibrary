import React, { RefObject, useEffect, useRef, useState } from 'react';
import AnimeList from '../components/AnimeList';
import { useFetching } from '../hooks/useFetching';
import { getAnimeList } from '../http/animeAPI';
import { AnimeItemI } from '../types/Global';
import classes from './styles/AllAnimePage.module.scss'

function AllAnimePage () {
    const [animeList, setAnimeList] = useState<AnimeItemI[]>([])
    const [page, setPage] = useState<number>(1)
    const [limit, setLimit] = useState<number>(10)
    const [totalPages, setTotalPages] = useState<number>(1)
    const ref = useRef<any>()
    const observer = useRef<any>()

    const [fetchList, isAnimeLoading] = useFetching( async (limit, page) => {
        const animelist = await getAnimeList(limit, page)
        setTotalPages(Math.ceil(animelist.data.count/limit))
        setAnimeList([...animeList, ...animelist.data.rows])
    })

    useEffect(() => {
        if (isAnimeLoading) return

        var cb = function(entries, observer) {
            if (entries[0].isIntersecting) {
                if(page < totalPages) {
                    setPage((prev) => prev + 1)
                }
            }
        };

        observer.current = new IntersectionObserver(cb);
        observer.current.observe(ref.current)      
        
        return(() => {
            observer.current.disconnect();
        })
    }, [isAnimeLoading])

    useEffect(() => {
        fetchList(limit, page)
    }, [limit, page])

    return (
        <div className="contain">
            <div className={classes.AAP_w}>
                <AnimeList animeList={animeList}>
                    <span className={classes.AAP_all}>Все аниме</span>
                    <div className={classes.AAP_description}>Самая большая коллекция аниме</div>
                </AnimeList>
                <div ref={ref} style={{height: '20px', width: "100%"}} />
            </div>
        </div>
    );
};

export default AllAnimePage;