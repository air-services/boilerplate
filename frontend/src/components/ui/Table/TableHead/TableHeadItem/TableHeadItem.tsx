import React from 'react';
import tableHeadItemStyles from './TableHeadItem.module.scss';

interface TableHeadItemProps {
  children: React.ReactNode;
}

const TableHeadItem = ({ children }: TableHeadItemProps) => {
  return <th className={tableHeadItemStyles.main}>{children}</th>;
};

export default TableHeadItem;
