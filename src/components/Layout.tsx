import { Outlet } from 'react-router-dom';
import Header from './Header';
import Menu  from './Menu';

export const Layout = () => {
  return (
    <div className="app">
      <Header />
      <Menu />
      <main>
        <Outlet />
      </main>
    </div>
  );
};
