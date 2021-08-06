import React from 'react';
import { useRouteMatch } from 'react-router-dom';

import DashboardEdit from 'modules/dashboards/DashboardEdit/DashboardEdit';

const DashboardEditPage = () => {
  const match: { params: { id: string } } = useRouteMatch();
  return <DashboardEdit id={match.params.id} />;
};

export default DashboardEditPage;
