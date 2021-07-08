import React, { useState, useEffect } from 'react';

import { serializeToCamel } from 'services/api/serializers';
import { RestModelApi } from 'services/api/rest';

import TableElement, {
  TableField,
} from 'components/ui/table/TableElement/TableElement';
import tableStyles from 'components/ui/table/Table.module.scss';
import Processing from 'components/ui/Processing/Processing';
import TableProvider, {
  useTableContext,
  TableConfig,
} from 'components/ui/table/TableProvider';
import Pagination from 'components/ui/Pagination/Pagination';

const TableView = () => {
  const table = useTableContext();

  return (
    <div className="shadow relative">
      {table.state.isProcessing && (
        <div className={tableStyles.processingWrapper}>
          <Processing size="large" />
        </div>
      )}

      <table className={tableStyles.main}>
        <thead className="bg-gray-50">
          <tr>
            {table.config.fields.map((field: TableField) => {
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
          {table.state.items.map((item: any) => {
            return (
              <TableElement
                fields={table.config.fields}
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

const Table = ({ tableConfig }: { tableConfig: TableConfig }) => {
  return (
    <TableProvider config={tableConfig}>
      <TableView />
      <Pagination />
    </TableProvider>
  );
};

export default Table;
