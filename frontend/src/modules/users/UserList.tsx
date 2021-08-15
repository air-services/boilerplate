import React from 'react';
import Table from 'components/ui/table/Table';
import Tag, { TagStyle } from 'components/ui/Tag/Tag';
import restApi from 'services/api/rest';
import ItemActions from 'components/ui/table/ItemActions/ItemActions';

const UserRoles = ({ value }: any) => {
  return (
    <td className="px-6 py-4 whitespace-nowrap">
      {value.map((role: { name: string; id: number }) => (
        <Tag text={role.name} key={role.id} style={TagStyle.info} />
      ))}
    </td>
  );
};

const IsActive = ({ value }: { value: Boolean }) => {
  return (
    <td className="px-6 py-4 whitespace-nowrap">
      {value ? (
        <Tag style={TagStyle.success} text="Активный" />
      ) : (
        <Tag style={TagStyle.warning} text="Неактивный" />
      )}
    </td>
  );
};

class UsersTableConfig {
  title = 'Пользователи';
  editUrl = 'users';
  createUrl = 'users/create';
  createLabel = 'Добавить пользователя';
  limit = 10;
  fields = [
    { id: 'id', label: 'ID' },
    { id: 'email', label: 'Электронная почта', isLink: true },
    { id: 'firstName', label: 'Имя' },
    { id: 'lastName', label: 'Фамилия' },
    { id: 'patronymic', label: 'Отчество' },
    { id: 'isActive', label: 'Активный', component: IsActive },
    { id: 'roles', label: 'Роли', component: UserRoles },
    { id: 'EditItem', label: '', component: ItemActions },
  ];
  api = restApi.api.users;
}

const tableConfig = new UsersTableConfig();

const UserList = () => <Table tableConfig={tableConfig} />;

export default UserList;
