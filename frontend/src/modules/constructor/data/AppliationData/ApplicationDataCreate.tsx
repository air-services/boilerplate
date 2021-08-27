import React from 'react';

import { excludeKeys, serializeToSnake } from 'services/api/serializers';
import ItemCreateForm, {
  FormConfigField,
  ItemCreateFormConfig,
} from 'components/ui/form/ItemCreateForm/ItemCreateForm';
import { getModelCrud } from 'services/api/rest';
import { Application } from 'modules/constructor/applications/constructorModels';

const ApplicationDataCreate = ({
  application,
}: {
  application: Application;
}) => {
  class FormConfig implements ItemCreateFormConfig {
    backUrl = `/${application.tableName}`;
    title = 'Create new item';
    submitLabel = 'Create';
    fields: FormConfigField[] = application.fields.map((field) => ({
      id: field.name,
      label: field.description,
      placeholder: field.name,
      render: 'TextInput',
    }));

    defaultValues = () => ({});

    serialize = (data: any) => {
      const result = serializeToSnake(excludeKeys('id')(data));
      return result;
    };

    api = getModelCrud(`/api/v1/${application.tableName}`);
  }

  const formConfig = new FormConfig();

  return <ItemCreateForm formConfig={formConfig} />;
};

export default ApplicationDataCreate;
