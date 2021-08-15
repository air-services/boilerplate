import React from 'react';
import { Link } from 'react-router-dom';
export interface TableField {
  id: string;
  label: string;
  component?: any;
  isLink?: boolean;
}

const TableElementField = ({
  value,
  link,
}: {
  value: string;
  link: string;
}) => {
  return (
    <td className="px-6 py-4 whitespace-nowrap">
      {link ? (
        <Link to={link}>
          <div className="text-sm text-gray-900 underline">{value}</div>
        </Link>
      ) : (
        <div className="text-sm text-gray-900">{value}</div>
      )}
    </td>
  );
};

const TableElement = ({
  fields,
  element,
  editUrl,
}: {
  fields: TableField[];
  element: any;
  editUrl: string;
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
            link={field.isLink ? `${editUrl}/${element.id}` : ''}
          />
        );
      })}
    </tr>
  );
};

export default TableElement;
