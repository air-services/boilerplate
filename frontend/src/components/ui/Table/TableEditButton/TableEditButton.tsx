import React from 'react';
import tableEditButtonStyles from './TableEditButton.module.scss';

interface TableEditButtonProps {
  children: React.ReactNode;
}

const TableEditButton = ({ children }: TableEditButtonProps) => {
  return <span className={tableEditButtonStyles.main}>{children}</span>;
};

export default TableEditButton;
