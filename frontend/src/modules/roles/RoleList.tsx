import React from 'react';
import restApi from 'services/api/rest';

import Table from 'components/ui/table/Table';
import ItemActions from 'components/ui/table/ItemActions/ItemActions';

class RolesTableConfig {
  title = 'Роли';
  limit = 10;
  editUrl = 'roles';
  createUrl = 'roles/create';
  createLabel = 'Создать роль';
  fields = [
    { id: 'id', label: 'ID' },
    { id: 'name', label: 'Название' },
    { id: 'EditItem', label: '', component: ItemActions },
  ];
  api = restApi.api.roles;
}

const tableConfig = new RolesTableConfig();

const RoleList = () => <Table tableConfig={tableConfig} />;

export default RoleList;
