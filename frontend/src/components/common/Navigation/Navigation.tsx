import React from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import navigationStyle from './Navigation.module.scss';

interface NavigationItemProps {
  to: string;
  icon: any;
  text: string;
}

interface NavigationSectionProps {
  title: string;
  items: NavigationItemProps[];
}

const navigationSections: NavigationSectionProps[] = [
  {
    title: 'Apps',
    items: [
      { to: '/users', text: 'Users', icon: 'user' },
      { to: '/roles', text: 'Roles', icon: 'key' },

      { to: '/projects', text: 'Projects', icon: 'desktop' },
      { to: '/dashboards', text: 'Dashboards', icon: 'info' },
    ],
  },
  {
    title: 'Statistic',
    items: [{ to: '/cards', text: 'Cards', icon: 'id-card' }],
  },
  {
    title: 'Constructor',
    items: [{ to: '/constructor', text: 'Constructor', icon: 'greater-than' }],
  },
];

const NavigationItem = (navigationItem: NavigationItemProps) => {
  return (
    <li className="items-center">
      <Link to={navigationItem.to} className={navigationStyle.navigationItem}>
        <i
          className={`fas ${navigationItem.icon} text-gray-300 mr-2 text-sm`}
        />

        <FontAwesomeIcon
          className="text-gray-300 mr-2 text-sm"
          icon={navigationItem.icon}
        />

        {navigationItem.text}
      </Link>
    </li>
  );
};

const NavigationSection = (navigationSection: NavigationSectionProps) => {
  return (
    <>
      <hr className={navigationStyle.divider} />
      <h6 className={navigationStyle.sectionTitle}>
        {navigationSection.title}
      </h6>
      <ul className={navigationStyle.sectionList}>
        {navigationSection.items.map((navigationItem: NavigationItemProps) => {
          return (
            <NavigationItem
              key={navigationItem.to}
              to={navigationItem.to}
              icon={navigationItem.icon}
              text={navigationItem.text}
            />
          );
        })}
      </ul>
    </>
  );
};

const Navigation = () => {
  return (
    <nav className={navigationStyle.main}>
      <Link to="/" className={navigationStyle.logo}>
        FastAPI admin
      </Link>
      <div>
        {navigationSections.map((navigationSection: NavigationSectionProps) => {
          return (
            <NavigationSection
              title={navigationSection.title}
              items={navigationSection.items}
              key={navigationSection.title}
            />
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;
