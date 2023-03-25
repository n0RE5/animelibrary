import { Navigate } from "react-router-dom";
import AdministratorPage from "./pages/AdministratorPage";
import AnimeSearchPage from "./pages/AnimeSearchPage";
import AuthPage from "./pages/AuthPage";
import ErrorPage from "./pages/ErrorPage";
import MainPage from "./pages/MainPage";
import UserProfilePage from "./pages/UserProfilePage";
import { ADMIN_ROUTE, ALL_ANIME_ROUTE, ANILIBRARY_ROUTE, ANIME_ROUTE, ERROR_ROUTE, LOGIN_ROUTE, PLAYER_ROUTE, PROFILE_ROUTE, REGISTRATION_ROUTE, SEARCH_ROUTE } from "./utils/consts";
import AnimePage from "./pages/AnimePage";
import AllAnimePage from "./pages/AllAnimePage";
import AnimePlayerPage from "./pages/AnimePlayerPage";

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: <AdministratorPage/>
    },
    {
        path: PROFILE_ROUTE,
        Component: <UserProfilePage/>
    }
]

export const publicRoutes = [
    {
        path: ANILIBRARY_ROUTE,
        Component: <MainPage/>
    },
    {
        path: LOGIN_ROUTE,
        Component: <AuthPage/>
    },
    {
        path: REGISTRATION_ROUTE,
        Component: <AuthPage/>
    },
    {
        path: ERROR_ROUTE,
        Component: <ErrorPage/>
    },
    {
        path: ALL_ANIME_ROUTE,
        Component: <AllAnimePage/>
    },
    {
        path: SEARCH_ROUTE,
        Component: <AnimeSearchPage/>
    },
    {
        path: PLAYER_ROUTE + '/:link',
        Component: <AnimePlayerPage/>
    },
    {
        path: ANIME_ROUTE + '/:id',
        Component: <AnimePage/>
    },
    {
        path: '*',
        Component: <Navigate to="/error" replace />
    }

]