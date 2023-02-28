import React, { useState } from 'react';
import AddAnime from './AdminPages/AddAnime';
import AnimeManagement from './AdminPages/AnimeManagement';
import Welcome from './AdminPages/Welcome';
import classes from './styles/AdministratorPage.module.scss'

function AdministratorPage() {
    const [renderedItem, setRenderedItem] = useState<React.ReactNode | JSX.Element>(<Welcome/>);

    return (
        <div className="extra_contain">
            <div className={classes.AP_w}>
                <div className={classes.AP_sidebar}>
                    <div className={classes.sidebar_title}>Доступные действия</div>
                    <button onClick={() => setRenderedItem(<Welcome/>)} className={classes.switch_button}>Главная</button>
                    <button onClick={() => setRenderedItem(<AddAnime/>)} className={classes.switch_button}>Добавить Аниме</button>
                    <button onClick={() => setRenderedItem(<AnimeManagement/>)} className={classes.switch_button}>Менеджер Списков</button>
                </div>
                {renderedItem} 
            </div>
        </div>
    );
};

export default AdministratorPage;