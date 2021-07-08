import React from 'react';
import Table from 'components/ui/table/Table';
import restApi from 'services/api/rest';
import ItemActions from 'components/ui/table/ItemActions/ItemActions';
import { TableConfig } from 'components/ui/table/TableProvider';

class ProjectsTableConfig implements TableConfig {
  limit = 5;
  editUrl = 'projects';
  fields = [
    { id: 'id', label: 'ID' },
    { id: 'name', label: 'Название' },
    {
      id: 'Actions',
      label: 'Действия',
      component: ItemActions,
    },
  ];
  api = restApi.api.projects;
}

const tableConfig = new ProjectsTableConfig();

const ProjectList = () => <Table tableConfig={tableConfig} />;

export default ProjectList;
