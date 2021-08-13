import React from 'react';
import Table from 'components/ui/table/Table';
import restApi from 'services/api/rest';
import classNames from 'classnames';
import ItemActions from 'components/ui/table/ItemActions/ItemActions';

const IsActive = ({ value }: { value: Boolean }) => {
  return (
    <td className="px-6 py-4 whitespace-nowrap">
      <span
        className={classNames(
          'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
          {
            ['bg-green-100 text-green-800']: value,
            ['bg-yellow-100 text-yellow-800']: !value,
          }
        )}>
        {value ? 'Активный' : 'Неактивный'}
      </span>
    </td>
  );
};

class UsersTableConfig {
  editUrl = 'users';
  createUrl = 'users/create';
  createLabel = 'Добавить пользователя';
  limit = 10;
  fields = [
    { id: 'id', label: 'ID' },
    { id: 'email', label: 'Электронная почта' },
    { id: 'firstName', label: 'Имя' },
    { id: 'lastName', label: 'Фамилия' },
    { id: 'patronymic', label: 'Отчество' },
    { id: 'isActive', label: 'Активный', component: IsActive },
    { id: 'EditItem', label: '', component: ItemActions },
  ];
  api = restApi.api.users;
}

const tableConfig = new UsersTableConfig();

const UserList = () => <Table tableConfig={tableConfig} />;

export default UserList;
