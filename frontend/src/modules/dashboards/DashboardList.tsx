import React from 'react';
import Table from 'components/ui/table/Table';
import restApi from 'services/api/rest';
import ItemActions from 'components/ui/table/ItemActions/ItemActions';
import { TableConfig } from 'components/ui/table/TableProvider';

class DashboardsTableConfig implements TableConfig {
  title = 'Пространства';
  limit = 5;
  editUrl = 'dashboards';
  createUrl = 'dashboards/create';
  createLabel = 'Создать пространство';
  fields = [
    { id: 'id', label: 'ID' },
    { id: 'name', label: 'Название' },
    {
      id: 'Actions',
      label: 'Действия',
      component: ItemActions,
    },
  ];
  api = restApi.api.dashboards;
}

const tableConfig = new DashboardsTableConfig();

const DashboardList = () => <Table tableConfig={tableConfig} />;

export default DashboardList;
