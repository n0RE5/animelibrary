import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import './styles/App.scss'
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { check } from './http/userAPI';
import { getAnimeList } from './http/animeAPI';
import { useFetching } from './hooks/useFetching';
import { setAuth, setUser } from './store/userSlice';
import { setGlobalList } from './store/globalListSlice';

function App() {
  // todo loading screen
  const dispatch = useDispatch()
  const [loading, setIsLoading] = useState(true);

  const [fetchList] = useFetching( async () => {
    const animeList = await getAnimeList(10, 1)
    return dispatch(setGlobalList( animeList.data.rows))
  })

  useEffect(() => { 
    fetchList()
  }, [])

  useEffect(() => {
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
