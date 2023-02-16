import React from 'react';
import classes from '../styles/AdministratorPage.module.scss'

const Welcome: React.FC = () => {
    return (
        <div className={classes.AP_body}>
                <div className={classes.media_info}>
                    <div className={classes.media_info_title}>Страница Администратора</div>
                    <div className={classes.media_info_description}>Вы попали на страницу администратора. Здесь вы можете управлять сайтом и базой данных напрямую.</div>
                    <hr className={classes.hr} />
                </div>
            </div>
    )  
}

export default Welcome;