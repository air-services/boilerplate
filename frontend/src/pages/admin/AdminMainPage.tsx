import React from 'react';
import Navigation from 'components/common/Navigation/Navigation';
import Page from 'components/ui/Page/Page';

import RoleList from 'modules/roles/RoleList';

const AdminMainPage = () => {
  return (
    <Page>
      <Navigation />
      <div className="relative md:ml-64">
        <RoleList />
      </div>
    </Page>
  );
};

export default AdminMainPage;
