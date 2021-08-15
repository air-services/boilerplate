import React from 'react';

import { excludeKeys, serializeToSnake } from 'services/api/serializers';
import ItemCreateForm, {
  FormConfigField,
  ItemCreateFormConfig,
} from 'components/ui/form/ItemCreateForm/ItemCreateForm';
import restApi from 'services/api/rest';

class FormConfig implements ItemCreateFormConfig {
  backUrl = '/dashboards';
  title = 'Создание пространство';
  submitLabel = 'Создать';
  fields: FormConfigField[] = [
    {
      id: 'name',
      label: 'Название',
      placeholder: 'Название',
      render: 'TextInput',
    },
    {
      id: 'project',
      label: 'Проект',
      placeholder: 'Проект',
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
    name: '',
    project: null,
  });

  serialize = (data: any) => {
    const result = serializeToSnake(excludeKeys('id')(data));
    return result;
  };

  api = restApi.api.dashboards;
}

const DashboardCreate = () => {
  const formConfig = new FormConfig();
  return <ItemCreateForm formConfig={formConfig} />;
};

export default DashboardCreate;
