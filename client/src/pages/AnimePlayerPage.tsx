import React from 'react';
import { useParams } from 'react-router-dom';
import classes from './styles/AnimePlayerPage.module.scss';

function AnimePlayerPage () {
    const link = useParams()    
    return (
        <div className={classes.player}>
            <video controls >
                  <source src={process.env.REACT_APP_API_URL + `${link.link}`} type="video/mp4"/>'
            </video>
        </div>
    );
};

export default AnimePlayerPage;