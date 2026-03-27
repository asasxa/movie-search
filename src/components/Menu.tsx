import React from 'react';
import { NavLink } from 'react-router-dom';
import { Paths } from '../paths';

const Menu = () => {
  return (
    <nav className='menu'>
      <NavLink className={'menu__item'} to={Paths.HOME}>Поиск</NavLink>
      <NavLink className={'menu__item'} to={Paths.FAVORITES}>Избранное</NavLink>
    </nav>
  )
}

export default Menu;
