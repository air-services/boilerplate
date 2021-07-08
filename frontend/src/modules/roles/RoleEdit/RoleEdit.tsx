import React from 'react';

import { excludeKeys, serializeToSnake } from 'services/api/serializers';
import EditItem, {
  FormConfigField,
  EditItemFormConfig,
} from 'components/ui/EditItem/EditItem';
import restApi from 'services/api/rest';

class FormConfig implements EditItemFormConfig {
  title = 'Редактирование роли';
  submitLabel = 'Обновить';
  fields: FormConfigField[] = [
    {
      id: 'name',
      label: 'Название',
      placeholder: 'Название',
      render: 'TextInput',
    },
  ];

  defaultState = () => ({
    isLoaded: false,
    data: {
      id: null,
      name: '',
    },
  });

  serialize = (data: any) => {
    return serializeToSnake(excludeKeys('id')(data));
  };

  api = restApi.api.roles;
}

const EditRole = ({ id }: { id: string }) => {
  const formConfig = new FormConfig();

  return <EditItem id={id} formConfig={formConfig} />;
};

export default EditRole;
