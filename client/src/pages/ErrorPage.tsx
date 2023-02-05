import { Link } from 'react-router-dom';
import classes from './styles/ErrorPage.module.scss'

function ErrorPage() {
    return (
        <div className={classes.Error}>
            <div className={classes.Error_404}>404</div>
            <div className={classes.Error_notFound}>Страница не найдена</div>
            <div className={classes.Error_message}>
                Скорее всего, вы попали сюда из-за опечатки в адресе страницы. Попробуйте <Link to="/">вернуться на главную</Link> или свяжитесь с администрацией сайта.
            </div>
        </div>
    );
};

export default ErrorPage;