import React from 'react';
import Table from 'components/ui/table/Table';
import restApi from 'services/api/rest';
import ItemActions from 'components/ui/table/ItemActions/ItemActions';
import { TableConfig } from 'components/ui/table/TableProvider';

const CardIcon = ({ value }: any) => {
  return (
    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-1">
      <div className="bg-gradient-to-tr   rounded-xl text-white grid items-center w-10 h-10 py-1 px-1 justify-center mb-0 from-blue-500 to-blue-700 shadow-lg-blue">
        <span className="material-icons text-white text leading-none">
          {value.name}
        </span>
      </div>
    </td>
  );
};

class CardsTableConfig implements TableConfig {
  title = 'Карточки';
  limit = 5;
  editUrl = 'cards';
  createUrl = 'cards/create';
  createLabel = 'Создать карточку';
  fields = [
    { id: 'id', label: 'ID' },
    { id: 'title', label: 'Название' },
    { id: 'value', label: 'Значение' },
    { id: 'change', label: 'Изменение' },
    { id: 'icon', label: 'Иконка', component: CardIcon },
    {
      id: 'Actions',
      label: 'Действия',
      component: ItemActions,
    },
  ];
  api = restApi.api.cards;
}

const tableConfig = new CardsTableConfig();

const CardtList = () => <Table tableConfig={tableConfig} />;

export default CardtList;
