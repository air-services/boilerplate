import React from 'react';
import NavBarLink from './NavBarLink'
import ProfileNavigation from './ProfileNavigation';

import './NavBarStyle.scss';


const NavBar = () => {
  return (
    <nav className="shadow-md py-5 px-8 flex items-center">
      <div className="space-x-10 ">
        <NavBarLink title="Start" url="/" />
        <NavBarLink title="Users" url="/users" />
        <NavBarLink title="Roles" url="/roles" />
      </div>
      <ProfileNavigation />
    </nav>
  );
};

export default NavBar;
