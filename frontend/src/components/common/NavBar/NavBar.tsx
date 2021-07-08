import React from 'react';
import NavBarLink from 'components/common/NavBar/NavBarLink'
import ProfileNavigation from 'components/common/ProfileNavigation/ProfileNavigation';

import 'components/common/NavBar/NavBarStyle.scss';


const NavBar = () => {
  return (
    <nav className="shadow-md py-5 px-8 flex items-center">
      <div className="space-x-10 ">
        <NavBarLink title="Start" url="/" />
        <NavBarLink title="Users" url="/users" />
        <NavBarLink title="Roles" url="/roles" />
        <NavBarLink title="Projects" url="/projects" />
      </div>
      <ProfileNavigation />
    </nav>
  );
};

export default NavBar;
