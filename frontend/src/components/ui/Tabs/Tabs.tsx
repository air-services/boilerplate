import React, { useState } from 'react';
import classNames from 'classnames';

import tabsStyle from './Tabs.module.scss';

interface TabsProps {
  tabs: string[];
  activeTab: string;
  setActiveTab(tab: string): void;
}

export const useTabs = (tabs: string[]) => {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  return { activeTab, setActiveTab };
};

const Tabs = ({ tabs, activeTab, setActiveTab }: TabsProps) => {
  return (
    <nav className={tabsStyle.main}>
      {tabs.map((tab: string) => {
        return (
          <a
            key={tab}
            onClick={() => {
              setActiveTab(tab);
            }}
            className={classNames(tabsStyle.item, {
              [tabsStyle.isActive]: tab === activeTab,
            })}>
            {tab}
          </a>
        );
      })}
    </nav>
  );
};

export default Tabs;
