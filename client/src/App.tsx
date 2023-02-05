import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import './assets/styles/App.scss'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { check } from './http/userAPI';
import { getAnimeFromList, getAnimeList } from './http/animeAPI';
import { useFetching } from './hooks/useFetching';
import { getUserWatchlist } from './http/watchlistAPI';

function App() {
  // todo loading screen
  const dispatch = useDispatch()
  const [loading, setIsLoading] = useState(true);
  const user = useSelector((state: any)=> state.userState.user);
  const [fetchList, isAnimeLoading, error] = useFetching( async () => {
    const animeList = await getAnimeList(10, 1)
    console.log(animeList)
    return dispatch({type: "SET_GLOBAL_LIST", payload: animeList})
  })

  const [fetchWinterList, isWinterListLoading, err] = useFetching( async () => {
    const winterList = await getAnimeFromList(1)
    return dispatch({type: "SET_WINTER_LIST", payload: winterList})
  })

  useEffect(() => { 
    fetchList()
    fetchWinterList()
  }, [])

  useEffect(() => {
    check().then((data: any) => {
      dispatch({type: "SET_IS_AUTH", payload: true})
      dispatch({type: "SET_USER", payload: data})
    }).finally(() => setIsLoading(false))
  }, []);

  return (
    <Router>
        <Navbar />
        {loading
        ? <div />
        : <div className="content">
            <AppRouter />
          </div>
        }
        <Footer/>
    </Router>
  );
}

export default App;
