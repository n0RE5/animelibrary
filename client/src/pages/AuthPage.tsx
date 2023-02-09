import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, registration } from '../http/userAPI';
import { setAuth, setUser } from '../store/userSlice';
import classes from './styles/AuthPage.module.scss'

function AuthPage() {
    const dispatch = useDispatch()
    const [isLoggingIn, setIsLoggingIn] = useState<boolean>(true)
    const [gotError, setGotError] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const navigate = useNavigate()

    const auth = async (e: any) => {
        try {
            e.preventDefault()
            let data;
            if(isLoggingIn) {
                data = await login(email, password)
            } else {
                data = await registration(email, password)
            }
            dispatch(setUser(data))
            dispatch(setAuth(true))
            return navigate('/')
        } catch (e: any) {
            setGotError(true)
            setErrorMessage(e.response?.data?.message)
        }
    }

    const authSwitch = () => {
        setIsLoggingIn((prev) => !prev)
        setGotError(false)
    }

    return (
        <div className={classes.AuthPage_container}>
            {isLoggingIn
            ?<div>
                {gotError
                ? <div className={classes.yellowBox}>
                    <div>{errorMessage}</div>
                </div>
                : null
                }
                <div className={classes.strong}>Вход</div>
                    <form>
                        <div className={classes.label}>Логин</div>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" />
                        <div className={classes.label}>Пароль</div>
                        <input value={password} type="password" onChange={(e) => setPassword(e.target.value)} />
                        <button onClick={(e) => auth(e)} className={classes.login}>Войти</button>
                    </form>
                    <div className={classes.redirect_form}>
                        <span>Нет аккаунта?</span>
                        <button onClick={() => authSwitch()} className={classes.register}>Зарегистрируйся</button>
                    </div>
            </div> 
            : <div>
                {gotError
                ? <div className={classes.yellowBox}>
                    <div>{errorMessage}</div>
                </div>
                : null
                }
                <div className={classes.strong}>Регистрация</div>
                    <form>
                        <div className={classes.label}>Электронная Почта (email)</div>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" />
                        <div className={classes.label}>Пароль</div>
                        <input value={password} type="password" onChange={(e) => setPassword(e.target.value)} />
                        <button onClick={(e) => auth(e)} className={classes.login}>Зарегистрироваться</button>
                    </form>
                    <div className={classes.redirect_form}>
                        <span>Уже есть аккаунт?</span>
                        <a onClick={() => authSwitch()} className={classes.register}>Войти</a>
                    </div>
            </div>
            }
        </div>
    );
};

export default AuthPage;