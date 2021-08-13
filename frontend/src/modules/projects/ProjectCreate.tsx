import React from 'react';

import { excludeKeys, serializeToSnake } from 'services/api/serializers';
import CreateItem, {
  FormConfigField,
  CreateItemFormConfig,
} from 'components/ui/form/CreateItem/CreateItem';
import restApi from 'services/api/rest';

class FormConfig implements CreateItemFormConfig {
  backUrl = '/projects';
  title = 'Создание проект';
  submitLabel = 'Создать';
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

  defaultValues = () => ({
    name: '',
    project: null,
  });

  serialize = (data: any) => {
    const result = serializeToSnake(excludeKeys('id')(data));
    return result;
  };

  api = restApi.api.projects;
}

const ProjectCreate = () => {
  const formConfig = new FormConfig();

  return <CreateItem formConfig={formConfig} />;
};

export default ProjectCreate;
