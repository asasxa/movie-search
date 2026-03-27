import Menu from './Menu'

type Props = {}

const Header = (props: Props) => {
  return (
    <>
      <h1 className='text-white text-center text-4xl mx-[auto] my-[3rem]'>Поиск фильмов по каталогу IMDb</h1>
      <Menu />
    </>
  )
}

export default Header;
