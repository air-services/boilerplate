import React from 'react';
import Table from 'components/table/Table';
import restApi from 'services/api/rest';
import EditItemLink from 'components/table/EditItemLink/EditItemLink';
import classNames from 'classnames';

const IsActive = ({ value }: { value: any }) => {
  return (
    <td className="px-6 py-4 whitespace-nowrap">
      <span className={classNames("px-2 inline-flex text-xs leading-5 font-semibold rounded-full", {
        ['bg-green-100 text-green-800']: value,
        ['bg-yellow-100 text-yellow-800']: !value,
      })}>
        {value ? 'Активный' : 'Неактивный'}
      </span>
    </td>
  );
};


class UsersTableConfig {
  fields = [
    { id: 'id', label: 'ID' },
    { id: 'email', label: 'Электронная почта' },
    { id: 'firstName', label: 'Имя' },
    { id: 'lastName', label: 'Фамилия' },
    { id: 'patronymic', label: 'Отчество' },
    { id: 'isActive', label: 'Активный', component: IsActive},
    { id: 'edit', label: '', component: EditItemLink('users') }
  ];
  api = restApi.api.users;
}

const tableConfig = new UsersTableConfig();

const UserList = () => <Table tableConfig={tableConfig} />;

export default UserList;

