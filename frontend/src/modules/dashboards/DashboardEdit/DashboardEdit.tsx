import React from 'react';

import { excludeKeys, serializeToSnake } from 'services/api/serializers';
import EditItem, {
  FormConfigField,
  EditItemFormConfig,
} from 'components/ui/EditItem/EditItem';
import restApi from 'services/api/rest';

class FormConfig implements EditItemFormConfig {
  backUrl = '/dashboards';
  title = 'Редактирование пространства';
  submitLabel = 'Обновить';
  submitAndContinueEditLabel = 'Обновить и продолжить редактировать';
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

  api = restApi.api.dashboards;
}

const EditDashboard = ({ id }: { id: string }) => {
  const formConfig = new FormConfig();

  return <EditItem id={id} formConfig={formConfig} />;
};

export default EditDashboard;
