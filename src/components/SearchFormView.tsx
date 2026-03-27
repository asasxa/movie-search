import { useState, type FormEvent, type ChangeEvent } from 'react';
import { fetchMovieById, fetchMovies } from '../slices/moviesSlice';
import { useAppDispatch } from '../hooks/hooks';
import { useNavigate } from 'react-router-dom';
import { Paths } from '../paths';

type TSearchFormView = {
  type: "byTitle" | "byID"
}

const SearchFormView = ({ type }: TSearchFormView) => {
  const [value, setvalue] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const { name } = evt.currentTarget;
    if (name === 'byTitle') {
      dispatch(fetchMovies(value));
      setvalue('')
      navigate(Paths.HOME);
    } else {
      dispatch(fetchMovieById(value));
      setvalue('');
      navigate(Paths.SEARCH);
    }
    setvalue('');
  }

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setvalue(evt.target.value);
  }

  return (
    <form onSubmit={handleSubmit} name={type} action="" className='w-[90%] max-w-[1000px] mx-auto my-[1.5rem] text-white'>
      <div className="">
        <label className='text-xl ' htmlFor={type}>Поиск по {type === "byTitle" ? "названию" : "идентификатору"}</label>
      </div>
      <div className="flex mt-4 opacity-60">
        <input
          placeholder={`Введите ${type === "byTitle" ? "название" : "идентификатор"} фильма`}
          id={type}
          type="text"
          className='text-xl border-2 p-2 rounded-md w-full text-black focus:opacity-100'
          name={type}
          onChange={handleChange}
          value={value}
          required
        />
        <button className='p-3.5 ml-3 border-2 rounded-md'>Поиск</button>
      </div>
    </form>
  )
}

export default SearchFormView;
