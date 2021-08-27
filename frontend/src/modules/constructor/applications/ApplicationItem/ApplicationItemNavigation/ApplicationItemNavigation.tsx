import React from 'react';
import classNames from 'classnames';

import applicationItemNavigationStyle from './ApplicationItemNavigation.module.scss';

export type ActiveTab = 'Model' | 'Serializer' | 'Relations' | 'Router';

interface ApplicationItemNavigationProps {
  activeTab: ActiveTab;
  setActiveTab(tab: ActiveTab): void;
}

const ApplicationItemNavigation = ({
  activeTab,
  setActiveTab,
}: ApplicationItemNavigationProps) => {
  const applicationTabs: ActiveTab[] = [
    'Model',
    'Serializer',
    'Relations',
    'Router',
  ];

  return (
    <nav className={applicationItemNavigationStyle.main}>
      {applicationTabs.map((tab: ActiveTab) => {
        return (
          <a
            key={tab}
            onClick={() => {
              setActiveTab(tab);
            }}
            className={classNames(applicationItemNavigationStyle.item, {
              [applicationItemNavigationStyle.isActive]: tab === activeTab,
            })}>
            {tab}
          </a>
        );
      })}
    </nav>
  );
};

export default ApplicationItemNavigation;
