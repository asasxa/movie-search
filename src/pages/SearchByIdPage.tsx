import React from 'react';
import { useAppSelector } from '../hooks/hooks';
import { selectLoading, selectMovieCard } from '../slices/moviesSlice';
import SearchFormView from '../components/SearchFormView';
import Loading from '../components/Loading';
import { TMovieCardView } from '../components/MovieCardView';
import FoundListItemView from '../components/FoundListItemView';
import NotFound from '../components/NotFound';

const SearchByIdPage = () => {
  const movieCardData = useAppSelector(selectMovieCard) as TMovieCardView;
  const loading = useAppSelector(selectLoading);

  return (
    <>
      <SearchFormView type='byTitle' />
      <SearchFormView type='byID' />
      <div className="page">
        {
          loading && <Loading />
        }
        {
          (movieCardData && movieCardData.Response === 'True') && <FoundListItemView {...movieCardData} />
        }
      </div>
      {
        (movieCardData && movieCardData.Response === 'False') && <NotFound />
      }
    </>
  )
}

export default SearchByIdPage;
