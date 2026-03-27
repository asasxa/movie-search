import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import SearchListPage from './pages/SearchListPage';
import SearchByIdPage from './pages/SearchByIdPage';
import FavoritesPage from './pages/FavoritesPage';
import NotFound from './components/NotFound';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<SearchListPage />} />
        <Route path="search/:id" element={<SearchByIdPage />} />
        <Route path="favorites" element={<FavoritesPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
