import React, { useState } from 'react';
import AddAnime from '../components/adminComponents/AddAnime';
import AnimeListManagement from '../components/adminComponents/AnimeListManagement';
import classes from './styles/AdministratorPage.module.scss'

const welcomePage = () => {
    return (<div className={classes.AP_body}>
                <div className={classes.media_info}>
                    <div className={classes.media_info_title}>Страница Администратора</div>
                    <div className={classes.media_info_description}>Вы попали на страницу администратора. Здесь вы можете управлять сайтом и базой данных напрямую.</div>
                    <hr className={classes.hr} />
                </div>
            </div>
    )  
}

function AdministratorPage() {

    const addAnimePage = <AddAnime/>
    const animeListPage = <AnimeListManagement />

    const [renderedItem, setRenderedItem] = useState<React.ReactNode | JSX.Element>(welcomePage);

    return (
        <div className="extra_contain">
            <div className={classes.AP_w}>
                <div className={classes.AP_sidebar}>
                    <div className={classes.sidebar_title}>Доступные действия</div>
                    <button onClick={() => setRenderedItem(welcomePage)} className={classes.switch_button}>Главная</button>
                    <button onClick={() => setRenderedItem(addAnimePage)} className={classes.switch_button}>Добавить Аниме</button>
                    <button onClick={() => setRenderedItem(animeListPage)} className={classes.switch_button}>Менеджер Списков</button>
                </div>
                {renderedItem} 
            </div>
        </div>
    );
};

export default AdministratorPage;