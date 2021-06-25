import React from 'react';
import RoleList from 'modules/roles/RoleList/RoleList';

const RoleListPage = () => {
  return (
    <div className="user-list-page">
      <div className="lg:mx-20 sm:mx-5 mb-16">
        <h1 className="text-lg my-10">Роли</h1>
        <RoleList />
      </div>
    </div>
  );
};

export default RoleListPage;
