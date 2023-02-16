import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { authRoutes, publicRoutes } from '../routes';

const AppRouter: React.FC = () => {
    const isAuth: boolean = useSelector((state: any) => state.userState.isAuth)
    
    return (
          <Fragment>
            <Routes>
                {isAuth && authRoutes.map(({path, Component}) => 
                    <Route key={path} path={path} element={Component}/>
                )}
                {publicRoutes.map(({path, Component}) =>
                    <Route key={path} path={path} element={Component}/>
                )}
            </Routes>
          </Fragment>
    );
};

export default AppRouter;