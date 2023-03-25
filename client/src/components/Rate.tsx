import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import starImg from '../assets/svg/star.svg'
import { updateAnimeRating, rateAnime } from '../http/ratingAPI';
import { AnimeItemI, IRootReducer } from '../types/Global';
import classes from './styles/Rate.module.scss'

interface RateProps {
    animeItem: AnimeItemI
}

const Rate: React.FC<RateProps> = ({animeItem}) => {
    const navigate = useNavigate()
    const [visible, setVisible] = useState<boolean>(false)
    const [rate, setRate] = useState<number>(0)
    const userState = useSelector<IRootReducer, IRootReducer["userState"]>(state => state.userState)

    const cl = [classes.stars]

    const updateRating = async () => {
        try {
            const res = updateAnimeRating(animeItem.id)
        } catch (e: any) {
            console.log(e.response?.data?.message)
        }
    }

    const rateCurrentAnime = async () => {
        try {
            if(!userState.isAuth) {
                return navigate('/login')
            }
            const res = await rateAnime(rate, userState.user.id, animeItem.id)
            setVisible(false)
            alert(`Вы оценили это аниме на ${rate}`)
        } catch (e: any) {
            alert(e.response?.data?.message)
        }
    }

    if(visible) {
        cl.push(classes.active)
    }

    useEffect(() => { 
        updateRating() 
    }, [])

    return (
    <div className={classes.media_rating}>
        <div className={classes.rating_left}>
            <span className={classes.AnimePage_rating}></span>
            <div className={classes.rating_text}>
                <div>{animeItem.rating}<span>/10</span></div>
            </div>
        </div>
        <div onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)} className={classes.rating_right}>
            <div className={classes.setRate}>
                <img src={starImg} className={classes.AnimePage_rating_user}/>
                <span>
                    {rate === 0
                    ? <div>
                        Оцените 
                        <br /> 
                        Аниме
                    </div>
                    : <div>
                        <span className={classes.your_rate}>{rate}</span>
                        <br />
                        Ваша оценка
                    </div>
                    }
                </span>
            </div>
            <div onMouseLeave={() => setRate(0)} className={cl.join(' ')}>
                <img onClick={rateCurrentAnime} onMouseEnter={() => setRate(1)} src={starImg} className={classes.star}/>
                <img onClick={rateCurrentAnime} onMouseEnter={() => setRate(2)} src={starImg} className={classes.star}/>
                <img onClick={rateCurrentAnime} onMouseEnter={() => setRate(3)} src={starImg} className={classes.star}/>
                <img onClick={rateCurrentAnime} onMouseEnter={() => setRate(4)} src={starImg} className={classes.star}/>
                <img onClick={rateCurrentAnime} onMouseEnter={() => setRate(5)} src={starImg} className={classes.star}/>
                <img onClick={rateCurrentAnime} onMouseEnter={() => setRate(6)} src={starImg} className={classes.star}/>
                <img onClick={rateCurrentAnime} onMouseEnter={() => setRate(7)} src={starImg} className={classes.star}/>
                <img onClick={rateCurrentAnime} onMouseEnter={() => setRate(8)} src={starImg} className={classes.star}/>
                <img onClick={rateCurrentAnime} onMouseEnter={() => setRate(9)} src={starImg} className={classes.star}/>
                <img onClick={rateCurrentAnime} onMouseEnter={() => setRate(10)} src={starImg} className={classes.star}/>
            </div>
        </div>
    </div>
    );
};

export default Rate;