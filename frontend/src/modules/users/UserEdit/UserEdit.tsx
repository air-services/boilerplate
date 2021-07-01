import React from 'react';

import { excludeKeys, serializeToSnake } from 'services/api/serializers';
import EditItem, {
  FormConfigField,
  EditItemFormConfig,
} from 'components/edit/EditItem';
import restApi from 'services/api/rest';
import CheckBoxInput from 'components/form/CheckboxInput/CheckBoxInput';

class FormConfig implements EditItemFormConfig {
  title = 'Редактирование пользователя';
  submitLabel = 'Обновить';
  fields: FormConfigField[] = [
    // {
    //   id: 'email',
    //   label: 'Электронная почта',
    //   placeholder: 'Электронная почта',
    //   render: 'TextInput',
    // },
    {
      id: 'firstName',
      label: 'Имя',
      placeholder: 'Имя',
      render: 'TextInput',
    },
    // {
    //   id: 'lastName',
    //   label: 'Фамилия',
    //   placeholder: 'Фамилия',
    //   render: 'TextInput',
    // },
    // {
    //   id: 'patronymic',
    //   label: 'Отчество',
    //   placeholder: 'Отчество',
    //   render: 'TextInput',
    // },
    // {
    //   id: 'isActive',
    //   label: 'Активный',
    //   placeholder: 'Активный',
    //   render: 'CheckBoxInput',
    // },
    {
      id: 'roles',
      label: 'Роли',
      placeholder: 'Роли',
      render: 'MultiSelectInput',
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
                search: {
                  name: inputValue,
                },
              })
              .then((response) => {
                resolve(response.data);
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
    const result =  serializeToSnake(excludeKeys('id')(data));
    return result;
  };

  api = restApi.api.users;
}

const EditUser = ({ id }: { id: string }) => {
  const formConfig = new FormConfig();

  return <EditItem id={id} formConfig={formConfig} />;
};

export default EditUser;
