import React from 'react';
import { useRouteMatch } from 'react-router-dom';

import RoleEdit from 'modules/roles/RoleEdit/RoleEdit';


const RoleEditPage = () => {
  const match: { params: { id: string } } = useRouteMatch();
  return <RoleEdit id={match.params.id} />;
};

export default RoleEditPage;
