import React from 'react';
import { useRouteMatch } from 'react-router-dom';

import { excludeKeys, serializeToSnake } from 'services/api/serializers';
import ItemEditForm, {
  FormConfigField,
  ItemEditFormConfig,
} from 'components/ui/form/ItemEditForm/ItemEditForm';
import restApi from 'services/api/rest';

class FormConfig implements ItemEditFormConfig {
  backUrl = '/roles';
  title = 'Редактирование роли';
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

  api = restApi.api.roles;
}

const EditRole = () => {
  const match: { params: { id: string } } = useRouteMatch();

  const formConfig = new FormConfig();
  return <ItemEditForm id={match.params.id} formConfig={formConfig} />;
};

export default EditRole;
