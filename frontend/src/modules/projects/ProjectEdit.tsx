import React from 'react';
import { useRouteMatch } from 'react-router-dom';

import { excludeKeys, serializeToSnake } from 'services/api/serializers';
import ItemEditForm, {
  FormConfigField,
  ItemEditFormConfig,
} from 'components/ui/form/ItemEditForm/ItemEditForm';
import restApi from 'services/api/rest';

class FormConfig implements ItemEditFormConfig {
  backUrl = '/projects';
  title = 'Редактирование проекта';
  submitLabel = 'Обновить';
  submitAndContinueEditLabel = 'Обновить и продолжить редактировать';
  fields: FormConfigField[] = [
    {
      id: 'name',
      label: 'Название',
      placeholder: 'Название',
      render: 'TextInput',
    },
    {
      id: 'users',
      label: 'Пользователи',
      placeholder: 'Пользователи',
      render: 'MultiSelectInput',
      isMulti: true,
      selectConfig: {
        getOptionLabel: (option: any) => {
          return option.email;
        },
        getOptionValue: (option: any) => {
          return option.id;
        },
        loadOptions: (inputValue: string) => {
          return new Promise((resolve) => {
            restApi.api.users
              .getList({
                search: [
                  {
                    field: 'email',
                    value: inputValue,
                    operator: 'like',
                  },
                ],
              })
              .then((response) => {
                resolve(response.data.items);
              });
          });
        },
      },
    },
    {
      id: 'dashboards',
      label: 'Пространства',
      placeholder: 'Пространства',
      render: 'MultiSelectInput',
      isMulti: true,
      selectConfig: {
        getOptionLabel: (option: any) => {
          return option.name;
        },
        getOptionValue: (option: any) => {
          return option.id;
        },
        loadOptions: (inputValue: string) => {
          return new Promise((resolve) => {
            restApi.api.dashboards
              .getList({
                search: [
                  {
                    field: 'name',
                    value: inputValue,
                    operator: 'like',
                  },
                ],
              })
              .then((response) => {
                resolve(response.data.items);
              });
          });
        },
      },
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

const EditProject = () => {
  const formConfig = new FormConfig();
  const match: { params: { id: string } } = useRouteMatch();

  return <ItemEditForm id={match.params.id} formConfig={formConfig} />;
};

export default EditProject;
