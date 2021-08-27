import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import navigationStyle from './Navigation.module.scss';
import restApi from 'services/api/rest';
import { serializeToCamel } from 'services/api/serializers';

interface NavigationItemProps {
  to: string;
  icon: any;
  text: string;
}

interface NavigationSectionProps {
  title: string;
  items: NavigationItemProps[];
}

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
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    restApi.api.applications.getList().then((response) => {
      setApplications(serializeToCamel(response.data.items));
    });
  }, []);

  const navigationSections = [
    {
      title: 'Scheme',
      items: applications.map((application: any) => {
        return {
          to: `/constructor/applications/${application.id}`,
          text: `${application.name} scheme`,
          icon: 'greater-than',
        };
      }),
    },
    {
      title: 'Data',
      items: applications.map((application: any) => {
        return {
          to: `/${application.tableName}`,
          text: `${application.name} data`,
          icon: 'database',
        };
      }),
    },
  ];

  return (
    <nav className={navigationStyle.main}>
      <Link to="/" className={navigationStyle.logo}>
        FastAPI admin
      </Link>
      <div>
        {applications.length > 0 &&
          navigationSections.map(
            (navigationSection: NavigationSectionProps) => {
              return (
                <NavigationSection
                  title={navigationSection.title}
                  items={navigationSection.items}
                  key={navigationSection.title}
                />
              );
            }
          )}
      </div>
    </nav>
  );
};

export default Navigation;
