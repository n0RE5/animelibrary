import React from 'react';
import { Link } from 'react-router-dom';
import classes from './styles/Footer.module.scss'

const Footer: React.FC = () => {
    return (
        <div className={classes.Footer}>
            <div className="contain">
                <div className={classes.Footer_w}>
                    <ul className={classes.Footer_links}>
                        <li>
                            <Link to="/">Для правообладателей</Link>
                        </li>
                        <li>
                            <Link to="/">Соглашение</Link>
                        </li>
                        <li>
                            <Link to="/allanime">Все аниме</Link>
                        </li>
                        <li>
                            <span className={classes.Footer_designby}>desing by animego.org</span>
                        </li>
                    </ul>
                    <span className={classes.Footer_copyright}>&copy; Anilibrary 2022-2023 </span>
                </div>
            </div>
        </div>
    );
};

export default Footer;