import React from 'react';
import Table from 'components/table/Table';
import restApi from 'services/api/rest';
import EditItemLink from 'components/table/EditItemLink/EditItemLink';



class ProjectsTableConfig {
  fields = [
    { id: 'id', label: 'ID' },
    { id: 'name', label: 'Название' },
    { id: 'edit', label: '', component: EditItemLink('projects') },
  ];
  api = restApi.api.projects;
}

const tableConfig = new ProjectsTableConfig();

const ProjectList = () => <Table tableConfig={tableConfig} />;

export default ProjectList;


