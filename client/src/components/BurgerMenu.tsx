import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { IUser } from '../types/Global';
import classes from './styles/BurgerMenu.module.scss'

const BurgerMenu: React.FC = () => {
    const isAuth: boolean = useSelector((state: any) => state.userState.isAuth)
    const user: IUser = useSelector((state: any) => state.userState.user)
    const [active, setActive] = useState<boolean>(false)
    const cl = [classes.burger]
    const menuCl = [classes.burgerModal]

    if(active) {
        cl.push(classes.active)
    }

    if(active) {
        menuCl.push(classes.open)
    }

    return (
        <div>
            <a onClick={() => setActive(!active)} className={cl.join(' ')}>
                <span></span>
                <span></span>
                <span></span>
            </a>
            <div className={menuCl.join(' ')}>
                <div className={classes.burgerModal_w}>
                    <Link onClick={() => setActive(false)} to='/'>Аниме</Link>
                    <Link onClick={() => setActive(false)} to='/'>Топ 100</Link>
                    <Link onClick={() => setActive(false)} to='/'>Расписание</Link>
                    {isAuth
                        ?   <Link onClick={() => setActive(false)} to={'/profile'} className={classes.btn_login}><span>Аккаунт ({user.email})</span></Link>

                        :   <Link onClick={() => setActive(false)} to={'/login'} className={classes.btn_login}><span>Войти</span></Link>
                    }
                </div>
            </div>
        </div>
    );
};

export default BurgerMenu;