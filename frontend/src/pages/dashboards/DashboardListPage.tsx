import React from 'react';
import DashboardList from 'modules/dashboards/DashboardList/DashboardList';

const DashboardListPage = () => {
  return (
    <div className="user-list-page">
      <div className="lg:mx-20 sm:mx-5 mb-16">
        <h1 className="text-lg my-10">Пространства</h1>
        <DashboardList />
      </div>
    </div>
  );
};

export default DashboardListPage;
