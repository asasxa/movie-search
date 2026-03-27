import { Layout } from './components/Layout';
import { Routes, Route } from 'react-router-dom';
import SearchListPage from './pages/SearchListPage';
import FavoritesPage from './pages/FavoritesPage';
import MovieCard from './components/MovieCard';
import SearchByIdPage from './pages/SearchByIdPage';
import { Paths } from './paths';

function App() {
  return (
    <>
      <Routes>
        <Route path={Paths.HOME} element={<Layout />}>
          <Route index element={<SearchListPage />} />
          <Route path={Paths.SEARCH} element={<SearchByIdPage />} />
          <Route path={Paths.FAVORITES} element={<FavoritesPage />} />
          <Route path={`${Paths.CARD}/:imdbID`} element={<MovieCard />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
