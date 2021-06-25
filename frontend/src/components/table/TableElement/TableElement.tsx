import React from 'react';

export interface TableField {
  id: string;
  label: string;
  component?: any;
}

const TableElementField = ({ value }: { value: string }) => {
  return (
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="text-sm text-gray-900">{value}</div>
    </td>
  );
};

const TableElement = ({
  fields,
  element,
}: {
  fields: TableField[];
  element: any;
}) => {
  return (
    <tr key={element.id}>
      {fields.map((field: TableField) => {
        const TableRender = field.component || TableElementField;
        return (
          <TableRender
            key={field.id}
            value={element[field.id]}
            id={element.id}
          />
        );
      })}
    </tr>
  );
};

export default TableElement;