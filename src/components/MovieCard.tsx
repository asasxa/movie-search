import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import {  fetchMovieById, selectLoading, selectMovieCard } from '../slices/moviesSlice';
import MovieCardView from './MovieCardView';
import Loading from './Loading';

const MovieCard = () => {
  const { imdbID } = useParams();
  const movieCard = useAppSelector(selectMovieCard);
  const loading = useAppSelector(selectLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (imdbID) {
      dispatch(fetchMovieById(imdbID));
    }
  }, [imdbID, dispatch])

  return (
    <>
      {
        loading && <Loading />
      }
      {
        movieCard && <MovieCardView {...movieCard} />
      }
    </>
  )
}

export default MovieCard;
