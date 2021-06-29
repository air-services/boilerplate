import React from 'react';
import restApi from 'services/api/rest';

import Table from 'components/table/Table';
import EditItemLink from 'components/table/EditItemLink/EditItemLink';

class RolesTableConfig {
  fields = [
    { id: 'id', label: 'ID' },
    { id: 'name', label: 'Название' },
    { id: 'edit', label: '', component: EditItemLink('roles') },
  ];
  api = restApi.api.roles;
}

const tableConfig = new RolesTableConfig();

const RoleList = () => <Table tableConfig={tableConfig} />;

export default RoleList;
