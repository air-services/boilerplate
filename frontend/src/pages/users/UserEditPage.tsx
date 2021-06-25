import React from 'react';
import { useRouteMatch } from 'react-router-dom';

import UserEdit from 'modules/users/UserEdit/UserEdit';


const UserEditPage = () => {
  const match: { params: { id: string } } = useRouteMatch();
  return <UserEdit id={match.params.id} />;
};

export default UserEditPage;
