import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { selectFavoritesMovies, addToFavorites, deleteFromFavorites } from '../slices/moviesSlice';
import { useNavigate } from 'react-router-dom';
import { Paths } from '../paths';
import './MovieCardView.css';

export type TMovieCardView = {
  Poster: string;
  Title: string;
  Year: string;
  Genre: string;
  Runtime: string;
  Director: string;
  Actors: string;
  imdbRating: string;
  imdbID: string;
  Country: string;
  Response: string;
};

interface Props extends TMovieCardView {}

const MovieCardView = (props: Props) => {
  const { Poster, Title, Year, Genre, Runtime, Director, Actors, imdbRating, Country, imdbID } = props;
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(selectFavoritesMovies);
  const isFavorites = favorites.some(e => e.imdbID === imdbID);
  const navigate = useNavigate();

  const onBtnClickHandler = () => {
    if (!isFavorites) {
      dispatch(addToFavorites({
        Poster,
        Title,
        Year,
        imdbID
      }));
      navigate(Paths.HOME);
    } else {
      if (imdbID) {
        dispatch(deleteFromFavorites(imdbID));
        navigate(Paths.HOME);
      }
    }
  };

  return (
    <article className='movie-card-view'>
      <div className="movie-card-view__img">
        <img src={Poster} alt="Poster" />
      </div>
      <div className="movie-card-view__info">
        <div className="movie-card-view__row">
          <div className="movie-card-view__label">Название:</div>
          <h3 className='movie-card-view__value'>{Title}</h3>
        </div>
        <div className="movie-card-view__row">
          <div className="movie-card-view__label">Год:</div>
          <h3 className='movie-card-view__value'>{Year}</h3>
        </div>
        <div className="movie-card-view__row">
          <div className="movie-card-view__label">Страна:</div>
          <h3 className='movie-card-view__value'>{Country}</h3>
        </div>
        <div className="movie-card-view__row">
          <div className="movie-card-view__label">Жанр:</div>
          <h3 className='movie-card-view__value'>{Genre}</h3>
        </div>
        <div className="movie-card-view__row">
          <div className="movie-card-view__label">Продолжительность:</div>
          <h3 className='movie-card-view__value'>{Runtime}</h3>
        </div>
        <div className="movie-card-view__row">
          <div className="movie-card-view__label">Режисёр:</div>
          <h3 className='movie-card-view__value'>{Director}</h3>
        </div>
        <div className="movie-card-view__row">
          <div className="movie-card-view__label">Актёры:</div>
          <h3 className='movie-card-view__value'>{Actors}</h3>
        </div>
        <div className="movie-card-view__row">
          <div className="movie-card-view__label">imdb Рейтинг:</div>
          <h3 className='movie-card-view__value'>{imdbRating}</h3>
        </div>
        <div className="movie-card-view__actions">
          <button
            className='movie-card-view__btn'
            onClick={onBtnClickHandler}
          >
            {
              !isFavorites ? "Добавить в избранное" : "Удалить из избранного"
            }
          </button>
        </div>
      </div>
    </article>
  );
};

export default MovieCardView;
