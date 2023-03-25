import React, { useState } from 'react';
import { AnimeItemI } from '../types/Global';
import BannerImage from './UI/BannerImage/BannerImage';
import StatsRenderer from './StatsRenderer';
import cl from './styles/AnimeHoverItem.module.scss';
import { Link } from 'react-router-dom';

interface AnimeModalProps {
    animeItem: AnimeItemI,
}

const AnimeModal: React.FC<AnimeModalProps> = ({animeItem}) => {
    const [visible, setVisible] = useState<boolean>(false)
    const [closeDelay, setCloseDelay] = useState<NodeJS.Timeout>()
    const [isClosing, setIsClosing] = useState<boolean>(false)
    const classes = [cl.AnimeHoverModal]

    if (isClosing) {
        classes.push(cl.close_animation)
    }

    if (visible) {
        classes.push(cl.open)
    }

    function openModal() {
        clearTimeout(closeDelay)
        setIsClosing(false)
        setVisible(true)
    }

    function closeModal() {
        setIsClosing(true)
        setCloseDelay(setTimeout(() => {
            setVisible(false)
            setIsClosing(false)
        }, 700))
    }

    return (
        <div className={cl.AnimeHoverModal_ReadMore} onMouseEnter={openModal} onMouseLeave={closeModal}>
            <BannerImage link={`/anime/${animeItem.id}`} src={process.env.REACT_APP_API_URL + animeItem.img} />
            <div>
                <div className={classes.join(' ')}>
                    <Link to={`/anime/${animeItem.id}`} className={cl.ModalAnime_title}>{animeItem.title}</Link>
                    <div className={cl.ModalAnime_japanese_title}>{animeItem.japanese_title}</div>
                    <div className={cl.ModalAnime_japan_title}>{animeItem.japan_title}</div>
                    <Link to={`/anime/${animeItem.id}`} className={cl.ModalAnime_button}>...</Link>
                    <hr />
                    <div className={cl.ModalAnime_description}>{animeItem.description}</div>
                    <StatsRenderer animeStats={animeItem.stats} />
                </div>
            </div>
        </div>
    );
};

export default AnimeModal;