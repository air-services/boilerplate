import React from 'react';
import rolesApi from 'services/api/roles';

import Table from 'components/table/Table';
import EditItem from 'components/table/EditItem/EditItem';

class RolesTableConfig {
  fields = [
    { id: 'id', label: 'ID' },
    { id: 'name', label: 'Название' },
    { id: 'edit', label: '', component: EditItem },
  ];
  api = rolesApi;
}

const RoleList = () => <Table config={RolesTableConfig} />;

export default RoleList;
