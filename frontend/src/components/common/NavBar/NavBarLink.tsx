import { Link } from 'react-router-dom';
import React from 'react';

const NavBarLink = ({ title, url }: { title: string; url: string }) => (
  <Link to={url} className="nav-bar-item">
    {title}
  </Link>
);

export default NavBarLink;