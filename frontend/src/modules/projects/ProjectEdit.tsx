import React from 'react';

import { excludeKeys, serializeToSnake } from 'services/api/serializers';
import ItemEditForm, {
  FormConfigField,
  EditItemFormConfig,
} from 'components/ui/form/ItemEditForm/ItemEditForm';
import restApi from 'services/api/rest';

class FormConfig implements EditItemFormConfig {
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

const EditProject = ({ id }: { id: string }) => {
  const formConfig = new FormConfig();

  return <ItemEditForm id={id} formConfig={formConfig} />;
};

export default EditProject;
