import React from 'react';
import { useRouteMatch } from 'react-router-dom';

import { excludeKeys, serializeToSnake } from 'services/api/serializers';
import ItemEditForm, {
  FormConfigField,
  ItemEditFormConfig,
} from 'components/ui/form/ItemEditForm/ItemEditForm';
import restApi from 'services/api/rest';

class FormConfig implements ItemEditFormConfig {
  backUrl = '/cards';
  title = 'Редактирование карточки';
  submitLabel = 'Обновить';
  submitAndContinueEditLabel = 'Обновить и продолжить редактировать';
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

  api = restApi.api.cards;
}

const EditCard = () => {
  const formConfig = new FormConfig();
  const match: { params: { id: string } } = useRouteMatch();

  return <ItemEditForm id={match.params.id} formConfig={formConfig} />;
};

export default EditCard;
