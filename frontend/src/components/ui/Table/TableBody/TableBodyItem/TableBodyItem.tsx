import React from 'react';
import tableBodyItemStyles from './TableBodyItem.module.scss';

interface TableBodyItemProps {
  children: React.ReactNode;
}

const TableBodyItem = ({ children }: TableBodyItemProps) => {
  return <td className={tableBodyItemStyles.main}>{children}</td>;
};

export default TableBodyItem;
