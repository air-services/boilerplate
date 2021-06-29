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




// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
//
// import restApi from 'services/api/rest';
// import { serializeToCamel } from 'services/api/serializers';
//
// import userListStyles from './UserList.module.scss';
// import classNames from 'classnames';
//
// interface TableField {
//   id: string;
//   label: string;
//   component?: any;
// }
//
// const Edit = ({ id }: any) => {
//   return (
//     <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//       <Link
//         to={`/users/${id}`}
//         className="text-indigo-600 hover:text-indigo-900">
//         Редактировать
//       </Link>
//     </td>
//   );
// };
//
// const IsActive = ({ value }: { value: any }) => {
//   return (
//     <td className="px-6 py-4 whitespace-nowrap">
//       <span className={classNames("px-2 inline-flex text-xs leading-5 font-semibold rounded-full", {
//         ['bg-green-100 text-green-800']: value,
//         ['bg-yellow-100 text-yellow-800']: !value,
//       })}>
//         {value ? 'Активный' : 'Неактивный'}
//       </span>
//     </td>
//   );
// };
//
// class UsersTable {
//   fields = [
//     { id: 'id', label: 'ID' },
//     { id: 'email', label: 'Электронная почта' },
//     { id: 'firstName', label: 'Имя' },
//     { id: 'lastName', label: 'Фамилия' },
//     { id: 'isActive', label: 'Активный', component: IsActive },
//     { id: 'edit', label: '', component: Edit },
//   ];
//   api = restApi.api.users;
// }
//
// const TableElementField = ({ value }: { value: string }) => {
//   return (
//     <td className="px-6 py-4 whitespace-nowrap">
//       <div className="text-sm text-gray-900">{value}</div>
//     </td>
//   );
// };
//
// const TableElement = ({
//   fields,
//   element,
// }: {
//   fields: TableField[];
//   element: any;
// }) => {
//   return (
//     <tr key={element.id}>
//       {fields.map((field: TableField) => {
//         const TableRender = field.component || TableElementField;
//         return (
//           <TableRender
//             key={field.id}
//             value={element[field.id]}
//             id={element.id}
//           />
//         );
//       })}
//     </tr>
//   );
// };
//
// const UserList = () => {
//   const [items, setItems] = useState([]);
//   const table = new UsersTable();
//
//   useEffect(() => {
//     table.api.getList().then((response) => {
//       setItems(serializeToCamel(response.data));
//     });
//   }, []);
//
//   return (
//     <div className="shadow">
//       <table className="min-w-full divide-y divide-gray-200">
//         <thead className="bg-gray-50">
//           <tr>
//             {table.fields.map((field: TableField) => {
//               return (
//                 <th
//                   scope="col"
//                   className={userListStyles.fieldTitle}
//                   key={field.id}>
//                   {field.label}
//                 </th>
//               );
//             })}
//           </tr>
//         </thead>
//         <tbody className="bg-white divide-y divide-gray-200">
//           {items.map((item: any) => {
//             return (
//               <TableElement
//                 fields={table.fields}
//                 element={item}
//                 key={item.id}
//               />
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// };
//
// export default UserList;
