import React from 'react';
import FoundListItemView from '../components/FoundListItemView';
import { useAppSelector } from '../hooks/hooks';
import { selectFavoritesMovies, selectLoading } from '../slices/moviesSlice';
import Loading from '../components/Loading';

const FavoritesPage = () => {
  const favorites = useAppSelector(selectFavoritesMovies);
  const loading = useAppSelector(selectLoading);

  return (
    <>
      <div className='page'>
        {
          loading && <Loading />
        }
        {
          (favorites.length !== 0) && favorites.map(e => <FoundListItemView key={e.imdbID} {...e} />)
        }
      </div>
      {
        favorites.length === 0 && <div className='text-white text-xl text-center'>Здесь пока ни чего нет.</div>
      }
    </>
  )
}

export default FavoritesPage;
