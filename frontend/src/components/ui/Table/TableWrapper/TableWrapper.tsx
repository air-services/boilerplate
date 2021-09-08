import React from 'react';
import tableWrapperStyles from './TableWrapper.module.scss';

interface TableWrapperProps {
  children: React.ReactNode;
}

const TableWrapper = ({ children }: TableWrapperProps) => {
  return <div className={tableWrapperStyles.main}>{children}</div>;
};

export default TableWrapper;
