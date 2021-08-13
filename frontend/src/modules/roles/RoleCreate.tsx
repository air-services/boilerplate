import React from 'react';

import { excludeKeys, serializeToSnake } from 'services/api/serializers';
import CreateItem, {
  FormConfigField,
  CreateItemFormConfig,
} from 'components/ui/form/CreateItem/CreateItem';
import restApi from 'services/api/rest';

class FormConfig implements CreateItemFormConfig {
  backUrl = '/roles';
  title = 'Создание роль';
  submitLabel = 'Создать';
  fields: FormConfigField[] = [
    {
      id: 'name',
      label: 'Название',
      placeholder: 'Название',
      render: 'TextInput',
    },
  ];

  defaultValues = () => ({
    name: '',
    project: null,
  });

  serialize = (data: any) => {
    const result = serializeToSnake(excludeKeys('id')(data));
    return result;
  };

  api = restApi.api.roles;
}

const RoleCreate = () => {
  const formConfig = new FormConfig();

  return <CreateItem formConfig={formConfig} />;
};

export default RoleCreate;
