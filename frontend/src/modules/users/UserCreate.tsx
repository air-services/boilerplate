import React from 'react';

import { excludeKeys, serializeToSnake } from 'services/api/serializers';
import ItemCreateForm, {
  FormConfigField,
  CreateItemFormConfig,
} from 'components/ui/form/ItemCreateForm/ItemCreateForm';
import restApi from 'services/api/rest';

class FormConfig implements CreateItemFormConfig {
  backUrl = '/users';
  title = 'Создание пользователя';
  submitLabel = 'Создать';
  fields: FormConfigField[] = [
    {
      id: 'email',
      label: 'Электронная почта',
      placeholder: 'Электронная почта',
      render: 'TextInput',
    },
    {
      id: 'firstName',
      label: 'Имя',
      placeholder: 'Имя',
      render: 'TextInput',
    },
    {
      id: 'lastName',
      label: 'Фамилия',
      placeholder: 'Фамилия',
      render: 'TextInput',
    },
    {
      id: 'patronymic',
      label: 'Отчество',
      placeholder: 'Отчество',
      render: 'TextInput',
    },
    {
      id: 'isActive',
      label: 'Активный',
      placeholder: 'Активный',
      render: 'CheckBoxInput',
    },
    {
      id: 'roles',
      label: 'Роли',
      placeholder: 'Роли',
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
            restApi.api.roles
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
    {
      id: 'projects',
      label: 'Проекты',
      placeholder: 'Проекты',
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
            restApi.api.projects
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
    email: '',
    firstName: '',
    lastName: '',
    patronymic: '',
    isActive: false,
    projects: [],
    roles: [],
  });

  serialize = (data: any) => {
    const result = serializeToSnake(excludeKeys('id')(data));
    return result;
  };

  api = restApi.api.users;
}

const UserCreate = () => {
  const formConfig = new FormConfig();

  return <ItemCreateForm formConfig={formConfig} />;
};

export default UserCreate;
