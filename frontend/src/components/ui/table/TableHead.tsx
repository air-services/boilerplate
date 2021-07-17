import React, { useCallback } from 'react';
import { TableField } from 'components/ui/table/TableElement/TableElement';
import tableStyles from 'components/ui/table/Table.module.scss';
import {
  TableConfig,
  useTableContext,
} from 'components/ui/table/TableProvider';
import { OrderType, RestModelApiSorting } from 'services/api/rest';

const getNextOrder = ({
  field,
  sorting,
}: {
  field: TableField;
  sorting: RestModelApiSorting;
}): OrderType => {
  if (field.id !== sorting.field) {
    return 'ASC';
  }

  return sorting.order === 'ASC' ? 'DESC' : 'ASC';
};

const TableHeadField = ({
  field,
  sorting,
  setSorting,
}: {
  field: TableField;
  sorting: RestModelApiSorting;
  setSorting(sorting: RestModelApiSorting): void;
}) => {
  const onChangeSortingHandler = useCallback(() => {
    setSorting({
      field: field.id,
      order: getNextOrder({ field, sorting }),
    });
  }, [sorting]);

  return (
    <th
      scope="col"
      className={tableStyles.fieldTitle}
      key={field.id}
      onClick={onChangeSortingHandler}>
      {field.label}
    </th>
  );
};

const TableHead = () => {
  const table = useTableContext();

  return (
    <thead className="bg-gray-50">
      <tr>
        {table.config.fields.map((field: TableField) => {
          return (
            <TableHeadField
              field={field}
              key={field.id}
              sorting={table.sorting}
              setSorting={table.setSorting}
            />
          );
        })}
      </tr>
    </thead>
  );
};

export default TableHead;
