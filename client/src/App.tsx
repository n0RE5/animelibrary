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
import { AnimeItemI } from './types/Global';

function App() {
  const dispatch = useDispatch()
  const [loading, setIsLoading] = useState(true);
  const globalList: AnimeItemI[] = useSelector((state: any) => state.globalList.animeList)

  const [fetchList] = useFetching( async () => {
    const animeList = await getAnimeList(10, 1)
    return dispatch(setGlobalList( animeList.data.rows))
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
