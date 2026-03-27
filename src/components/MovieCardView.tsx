import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { selectFavoritesMovies, addToFavorites, deleteFromFavorites } from '../slices/moviesSlice';
import { useNavigate } from 'react-router-dom';
import { Paths } from '../paths';

export type TMovieCardView = {
  Poster: string,
  Title: string,
  Year: string,
  Genre: string,
  Runtime: string,
  Director: string,
  Actors: string,
  imdbRating: string,
  imdbID: string,
  Country: string,
  Response: string
}

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
    <article className='p-3 flex bg-[#361f36] text-white opacity-60 w-[90%] max-w-[1000px] mx-auto my-[1rem]'>
      <div className="img">
        <img src={Poster} alt="Poster" />
      </div>
      <div className="flex flex-col ml-4 flex-1">
        <div className="flex p-2">
          <div className="pt-1.5 flex-1">Название:</div>
          <h3 className='text-xl'>{Title}</h3>
        </div>
        <div className="flex p-2">
          <div className="pt-1.5 flex-1">Год:</div>
          <h3 className='text-xl'>{Year}</h3>
        </div>
        <div className="flex p-2">
          <div className="pt-1.5 flex-1">Страна:</div>
          <h3 className='text-xl'>{Country}</h3>
        </div>
        <div className="flex p-2">
          <div className="pt-1.5 flex-1">Жанр:</div>
          <h3 className='text-xl'>{Genre}</h3>
        </div>
        <div className="flex p-2">
          <div className="pt-1.5 flex-1">Продолжительность:</div>
          <h3 className='text-xl'>{Runtime}</h3>
        </div>
        <div className="flex p-2">
          <div className="pt-1.5 flex-1">Режисёр:</div>
          <h3 className='text-xl'>{Director}</h3>
        </div>
        <div className="flex p-2">
          <div className="pt-1.5 flex-1">Актёры:</div>
          <h3 className='text-xl ml-auto'>{Actors}</h3>
        </div>
        <div className="flex p-2">
          <div className="pt-1.5 flex-1">imdb Рейтинг:</div>
          <h3 className='text-xl'>{imdbRating}</h3>
        </div>
        <div className="flex items-center mt-auto mx-auto">
          <button
            className='p-2 border-2'
            onClick={onBtnClickHandler}
          >
            {
              !isFavorites ? "Добавить в избранное" : "Удалить из избранного"
            }
          </button>
        </div>
      </div>
    </article>
  )
}

export default MovieCardView;
