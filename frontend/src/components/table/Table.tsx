import React, { useState, useEffect } from 'react';

import { serializeToCamel } from 'services/api/serializers';
import { RestModelApi } from 'services/api/rest';


import TableElement, { TableField } from './TableElement/TableElement';
import tableStyles from './Table.module.scss';

class TableConfig {
  constructor(fields: [any], api: RestModelApi) {
    this.fields = fields;
    this.api = api;
  }
  fields: any[];
  api: RestModelApi;
}

const Table = ({ tableConfig }: { tableConfig: TableConfig }) => {
  const [items, setItems] = useState([]);

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
