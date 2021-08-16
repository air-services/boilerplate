import React from 'react';

import { excludeKeys, serializeToSnake } from 'services/api/serializers';
import ItemCreateForm, {
  FormConfigField,
  ItemCreateFormConfig,
} from 'components/ui/form/ItemCreateForm/ItemCreateForm';
import restApi from 'services/api/rest';

class FormConfig implements ItemCreateFormConfig {
  backUrl = '/cards';
  title = 'Создание карточку';
  submitLabel = 'Создать';
  fields: FormConfigField[] = [
    {
      id: 'title',
      label: 'Название',
      placeholder: 'Название',
      render: 'TextInput',
    },

    {
      id: 'value',
      label: 'Значение',
      placeholder: 'Значение',
      render: 'TextInput',
    },

    {
      id: 'direction',
      label: 'Направление',
      placeholder: 'Направление',
      render: 'TextInput',
    },

    {
      id: 'change',
      label: 'Изменение',
      placeholder: 'Изменение',
      render: 'TextInput',
    },

    {
      id: 'changeTitle',
      label: 'Период изменения',
      placeholder: 'Период изменения',
      render: 'TextInput',
    },

    {
      id: 'icon',
      label: 'Иконка',
      placeholder: 'Иконка',
      render: 'MultiSelectInput',
      isMulti: false,
      selectConfig: {
        getOptionLabel: (option: any) => {
          return option.name;
        },
        getOptionValue: (option: any) => {
          return option.id;
        },
        loadOptions: (inputValue: string) => {
          return new Promise((resolve) => {
            restApi.api.icons
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
    title: '',
    icon: null,
  });

  serialize = (data: any) => {
    const result = serializeToSnake(excludeKeys('id')(data));
    return result;
  };

  api = restApi.api.cards;
}

const CardCreate = () => {
  const formConfig = new FormConfig();

  return <ItemCreateForm formConfig={formConfig} />;
};

export default CardCreate;
