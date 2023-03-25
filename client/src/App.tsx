import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import './styles/App.scss'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { check } from './http/userAPI';
import { getAnimeList } from './http/animeAPI';
import { useFetching } from './hooks/useFetching';
import { setAuth, setUser } from './store/userSlice';
import { setGlobalList } from './store/globalListSlice';
import { AnimeItemI, IRootReducer } from './types/Global';

function App() {
  const dispatch = useDispatch()
  const [loading, setIsLoading] = useState(true);
  const globalList = useSelector<IRootReducer, AnimeItemI[]>(state => state.globalList.animeList)

  const [fetchList] = useFetching( async () => {
    const animeList = await getAnimeList(0, 1)
    return dispatch(setGlobalList(animeList.data.rows))
  })

  useEffect(() => {
    if (!globalList.length) {
      fetchList()
    }

    check().then((data: any) => {
      dispatch(setAuth(true))
      dispatch(setUser(data))
    }).finally(() => setIsLoading(false))
  }, []);

  return (
    <div className="wrapper">
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
    </div>
  );
}

export default App;
