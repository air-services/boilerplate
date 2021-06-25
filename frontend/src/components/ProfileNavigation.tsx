import React, { useState, useCallback, useEffect } from 'react';
import { useAppContext } from 'providers/AppContextProvider';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import NavBarLink from './NavBarLink';

import profileNavigationStyles from './ProfileNavigatoin.module.scss';

interface AccountMenuItemModel {
  title: string;
  url: string;
  onClick?: () => void;
}

const accountMenuItemClassNames = `
  text-sm py-3
  hover:opacity-100
  opacity-80
  transition-opacity
  duration-300
  cursor-pointer
`;

const AccountMenu = ({ logout }: { logout: () => void }) => (
  <div className={profileNavigationStyles.accountMenu}>
    <Link to="/account/settings" className={accountMenuItemClassNames}>
      Account Settings
    </Link>
    <a className={accountMenuItemClassNames} onClick={logout}>
      Logout
    </a>
  </div>
);

const ProfileNavigation = () => {
  const { account, logout } = useAppContext();
  const location = useLocation();
  const [isShowAccountMenu, setIsShowAccountMenu] = useState(false);
  const toggleIsShowAccountMenu = useCallback(() => {
    setIsShowAccountMenu((state) => !state);
  }, []);

  useEffect(() => {
    setIsShowAccountMenu(false);
  }, [location]);

  return (
    <div className={profileNavigationStyles.profileNavigation}>
      {account.isLoaded && account.data.id && (
        <>
          <a
            onClick={toggleIsShowAccountMenu}
            className={profileNavigationStyles.toggleAccountMenu}>
            <div className="text-gray-800">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                viewBox="0 0 24 24"
                className="w-5 h-5">
                <path d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="pl-3">
              <p className="text-sm font-medium text-gray-800 leading-none">
                {account.data.email}
              </p>
            </div>
          </a>
          {isShowAccountMenu && <AccountMenu logout={logout} />}
        </>
      )}

      {account.isLoaded && !account.data.id && (
        <>
          <NavBarLink title={'LogIn'} url={'/login'} />
          <NavBarLink title={'SignUp'} url={'/signup'} />
        </>
      )}
    </div>
  );
};

export default ProfileNavigation;
