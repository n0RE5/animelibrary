import React from 'react';
import { useSelector } from 'react-redux';
import { IRootReducer, IUser } from '../../types/Global';
import classes from '../styles/UserProfilePage.module.scss'

const Account: React.FC = () => {
    const user = useSelector<IRootReducer, IUser>(state => state.userState.user)

    return (
        <div className={classes.UPP_body}>
            <div className={classes.media_info}>
                <div className={classes.media_info_title}>Настройки аккаунта</div>
                <div className={classes.media_info_description}>Здесь вы можете настроить дополнительные параметры для своего аккаунта</div>
                <hr />
            </div>
            <div className={classes.settings}>
                <div className={classes.settings_flex}>
                    <span>Логин (email)</span>
                    <div>{user.email}</div>
                </div>
                <div className={classes.settings_flex}>
                    <span>Пароль </span>
                    <div>********</div>
                </div>
            </div>
        </div>
    )
};

export default Account;