import { Link } from 'react-router-dom'
import { Paths } from '../paths'

export type TFoundListItemView = {
  Poster: string,
  Title: string,
  Year: string,
  imdbID: string
}

const FoundListItemView = ({ Poster, Title, Year, imdbID }: TFoundListItemView) => {
  return (
    <Link to={`${Paths.CARD}/${imdbID}`}>
      <article className='flex flex-col justify-between p-3 text-white rounded-xl bg-[#361f36] hover:border h-full'>
        <div className="img">
          <img src={Poster} alt="Poster" />
        </div>
        <div className='mt-3'>
          <h3 className='font-semibold'>{Title}</h3>
          <div className='mt-2 opacity-60'>{Year}г</div>
        </div>
      </article>
    </Link>
  )
}

export default FoundListItemView;
