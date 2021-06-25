import React, { useState, useEffect } from 'react';
import { serializeToCamel } from 'services/api/serializers';

import TableElement, { TableField } from './TableElement/TableElement';
import tableStyles from './Table.module.scss';

const Table = ({ config }: any) => {
  const [items, setItems] = useState([]);
  const tableConfig = new config();

  useEffect(() => {
    tableConfig.api.getList().then((response: any) => {
      setItems(serializeToCamel(response.data));
    });
  }, []);

  return (
    <div className="shadow">
      <table className={tableStyles.main}>
        <thead className="bg-gray-50">
          <tr>
            {tableConfig.fields.map((field: TableField) => {
              return (
                <th
                  scope="col"
                  className={tableStyles.fieldTitle}
                  key={field.id}>
                  {field.label}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className={tableStyles.body}>
          {items.map((item: any) => {
            return (
              <TableElement
                fields={tableConfig.fields}
                element={item}
                key={item.id}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
