import React from 'react'
import FoundListItemView from '../components/FoundListItemView';
import SearchFormView from '../components/SearchFormView';
import { useAppSelector } from '../hooks/hooks';
import { selectFoundMovies, selectLoading } from '../slices/moviesSlice';
import Loading from '../components/Loading';
import NotFound from '../components/NotFound';

const SearchListPage = () => {
  const movies = useAppSelector(selectFoundMovies);
  const loading = useAppSelector(selectLoading);

  return (
    <>
      <SearchFormView type='byTitle' />
      <SearchFormView type='byID' />
      <div className='page'>
        {
          loading && <Loading />
        }
        {
          (movies.Response === 'True') && movies.Search.map(el => <FoundListItemView key={el.imdbID} {...el} />)
        }
      </div>
      {
        (movies.Response === 'False') && <NotFound />
      }
    </>
  )
}

export default SearchListPage;
