import React from 'react';
import { Application } from 'modules/constructor/applications/constructorModels';
import Table from 'components/ui/table/Table';
import ItemActions from 'components/ui/table/ItemActions/ItemActions';
import { getModelCrud } from 'services/api/rest';

const ApplicationDataList = ({ application }: { application: Application }) => {
  class ApplicationTableConfig {
    title = application.name;
    limit = 10;
    editUrl = application.tableName;
    createUrl = `${application.tableName}/create`;
    createLabel = 'Create';
    fields = [
      ...application.fields.map((field) => ({
        id: field.name,
        label: field.description,
      })),
      { id: 'EditItem', label: '', component: ItemActions },
    ];
    api = getModelCrud(`/api/v1/${application.tableName}`);
  }

  const tableConfig = new ApplicationTableConfig();

  return <Table tableConfig={tableConfig} />;
};

export default ApplicationDataList;
