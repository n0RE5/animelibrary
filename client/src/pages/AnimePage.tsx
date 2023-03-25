import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import AnimeSelf from '../components/AnimeSelf';
import { getAnime } from '../http/animeAPI';

function AnimePage() {
    const id = useParams()
    const [renderedItem, setRenderedItem] = useState<React.ReactNode | JSX.Element>(<div/>)

    const searchAnimePage = async () => {
        try {
            if(!id || !id.id) {
                return <Navigate to="/error" replace />
            }
            const searchResult = await getAnime(id.id)

            if(searchResult.data === null) {
                return <Navigate to="/error" replace />
            }

            return <AnimeSelf animeItem={searchResult.data} />
        } catch (e) {
            console.log(e)
            return <Navigate to="/error" replace />
        }
    }

    useEffect(() => {
        searchAnimePage().then(data => setRenderedItem(data))
    }, [])

    return (
        <div>
            {renderedItem}
        </div>
    );
};

export default AnimePage;