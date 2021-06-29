import React from 'react';

import { excludeKeys, serializeToSnake } from 'services/api/serializers';
import EditItem, {
  FormConfigField,
  EditItemFormConfig,
} from 'components/edit/EditItem';
import restApi from 'services/api/rest';

class FormConfig implements EditItemFormConfig {
  title = 'Редактирование проекта';
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

  api = restApi.api.projects;
}

const EditProject = ({ id }: { id: string }) => {
  const formConfig = new FormConfig();

  return <EditItem id={id} formConfig={formConfig} />;
};

export default EditProject;
