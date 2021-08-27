import React from 'react';

import { excludeKeys, serializeToSnake } from 'services/api/serializers';
import { FormConfigField } from 'components/ui/form/ItemCreateForm/ItemCreateForm';
import { getModelCrud } from 'services/api/rest';
import { Application } from 'modules/constructor/applications/constructorModels';
import ItemEditForm, {
  ItemEditFormConfig,
} from 'components/ui/form/ItemEditForm/ItemEditForm';
import { useRouteMatch } from 'react-router-dom';

const ApplicationDataCreate = ({
  application,
}: {
  application: Application;
}) => {
  const defaultState = () => {
    return application.fields.reduce(
      (result, field) => ({
        ...result,
        [field.name]: '',
      }),
      {}
    );
  };

  class FormConfig implements ItemEditFormConfig {
    backUrl = `/${application.tableName}`;
    title = 'Update item';
    submitLabel = 'Update';
    fields: FormConfigField[] = application.fields.map((field) => ({
      id: field.name,
      label: field.description,
      placeholder: field.name,
      render: 'TextInput',
    }));

    defaultState = defaultState;

    serialize = (data: any) => {
      const result = serializeToSnake(excludeKeys('id')(data));
      return result;
    };

    api = getModelCrud(`/api/v1/${application.tableName}`);
  }

  const formConfig = new FormConfig();

  const match: { params: { id: string } } = useRouteMatch();

  return <ItemEditForm id={match.params.id} formConfig={formConfig} />;
};

export default ApplicationDataCreate;
