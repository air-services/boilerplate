import React from 'react';

import { excludeKeys, serializeToSnake } from 'services/api/serializers';
import ItemCreateForm, {
  FormConfigField,
  CreateItemFormConfig,
} from 'components/ui/form/ItemCreateForm/ItemCreateForm';
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

  return <ItemCreateForm formConfig={formConfig} />;
};

export default RoleCreate;
