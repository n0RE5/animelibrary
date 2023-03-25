import React, { useState } from 'react';
import { AnimeItemI, IRootReducer } from '../types/Global';
import BannerImage from './UI/BannerImage/BannerImage';
import StatsRenderer from './StatsRenderer';
import classes from './styles/AnimeSelf.module.scss'
import { Link, useNavigate } from 'react-router-dom';
import Modal from './UI/Modal/Modal';
import ClickableImage from './UI/ClickableImage/ClickableImage';
import { addToUserWatchlist } from '../http/watchlistAPI';
import { useSelector } from 'react-redux';
import Rate from './Rate';

interface AnimeSelfProps {
    animeItem: AnimeItemI
}

const AnimeSelf: React.FC<AnimeSelfProps> = ({animeItem}) => {
    const navigate = useNavigate()
    const [visible, setVisible] = useState<boolean>(false)
    const [children, setChildren] = useState<React.ReactNode | null>() 
    const userState = useSelector<IRootReducer, IRootReducer["userState"]>((state: any) => state.userState)

    const addToFavorite = async () => {
        try {
            if(!userState.isAuth) {
                return navigate('/login')
            }
            const res = await addToUserWatchlist(userState.user.watchlistId, animeItem.id)
            alert('Added to your favorite list!')
        } catch (e: any) {
            alert(e.response?.data?.message)
        }
    }

    return (
        <div className="contain">
            <div className={classes.AnimePage}>
            <div className={classes.media_block_1}>
                <div className={classes.media}>
                    <div className={classes.media_img}>
                        <BannerImage disabled src={process.env.REACT_APP_API_URL + animeItem.img} />
                    </div>
                    <div className={classes.media_panel}>
                        <Link to={`/player/${animeItem.video}`} className={[classes.btn__watch, classes.btn].join(' ')}><span>Смотреть онлайн</span></Link>
                        <button className={[classes.btn__comment, classes.btn].join(' ')}><span>Написать отзыв</span></button>
                        <button onClick={addToFavorite} className={[classes.btn__favorite, classes.btn].join(' ')} ><span>Добавить в избранное</span></button>
                        <Link to={`/search/?genre=${animeItem.genres?.split(' ')[0]}`} className={[classes.btn__similar, classes.btn].join(' ')}><span>Похожие аниме</span></Link>
                    </div>
                </div>
                <div className={classes.media_info}>
                    <Rate animeItem={animeItem} />
                    <div className={classes.AnimePage_title}>{animeItem.title}</div>
                    <div className={classes.AnimePage_japanese_title}>{animeItem.japanese_title}</div>
                    <div className={classes.AnimePage_japan_title}>{animeItem.japan_title}</div>
                    <a className={classes.AnimePage_button} href="">...</a>
                    <hr />
                    <StatsRenderer animeStats={animeItem.stats} />
                </div>
            </div>
            <div className={classes.media_block_2}>
                <div className={classes.AnimePage_description}>{animeItem.description}</div>
            </div>
            <div className={classes.media_block_3}>
                <div className={classes.AnimePage_gallery}>
                    <div><strong className={classes.strong}>Кадры</strong></div>
                    <div className={classes.AnimePage_images}>
                        <ClickableImage visible={visible} setChildren={setChildren} setVisible={setVisible} img={animeItem.gallery_1} />
                        <ClickableImage visible={visible} setChildren={setChildren} setVisible={setVisible} img={animeItem.gallery_2} />
                        <ClickableImage visible={visible} setChildren={setChildren} setVisible={setVisible} img={animeItem.gallery_3} />
                        <ClickableImage visible={visible} setChildren={setChildren} setVisible={setVisible} img={animeItem.gallery_4} />
                    </div>
                </div>
            </div>
            </div>
            <Modal visible={visible} setVisible={setVisible} children={children} />
        </div>
    );
};

export default AnimeSelf;