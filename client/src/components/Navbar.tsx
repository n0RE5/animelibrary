import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { IUser } from '../types/Global';
import BurgerMenu from './BurgerMenu';
import classes from './styles/Navbar.module.scss'

const Navbar: React.FC = () => {
    const isAuth: boolean = useSelector((state: any) => state.userState.isAuth)
    const user: IUser = useSelector((state: any) => state.userState.user)

    return (
        <div className={classes.Navbar}>
            <div className="contain">
                <div className={classes.Navbar_w}>
                    <div className={classes.Navbar_left}>
                        <div className={classes.Navbar_title}>ANILibrary</div>
                        <ul className={classes.Navbar_bar}>
                            <li><Link to="">Аниме</Link></li>
                            <li><Link to="">Топ 100</Link></li>
                            <li><Link to="">Расписание</Link></li>
                            <li><Link to={`/search/?status=Онгоинг`}>Онгоинги</Link></li>
                        </ul>
                    </div>
                    <div className={classes.Navbar_right}>
                        {isAuth
                        ?<div>
                            <Link to={'/profile'} className={classes.btn_login}><span>Аккаунт ({user.email})</span></Link>
                        </div>
                        :   <Link to={'/login'} className={classes.btn_login}><span>Войти</span></Link>
                        }
                        <div className={classes.Navbar_burger}>
                            <BurgerMenu />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;