import React from 'react';
import { useAppContext } from '../providers/AppContextProvider';

import { Link } from 'react-router-dom';
const NavItem = ({ title, url }: { title: string; url: string }) => (
  <Link
    to={url}
    className="text-sm font-medium transition-colors duration-100 transform hover:text-yellow-600">
    {title}
  </Link>
);

const NavBar = () => {
  const { account } = useAppContext();
  return (
    <nav className="shadow-md py-5 px-8 py-5 px-8">
      {account.id && <div>{account.id}</div>}
      <div className="space-x-10 ">
        <NavItem title="Start" url="/" />
        <NavItem title="Users" url="/users" />
        <NavItem title="SignUp" url="/signup" />
        <NavItem title="LogIn" url="/login" />
      </div>
    </nav>
  );
};

export default NavBar;
