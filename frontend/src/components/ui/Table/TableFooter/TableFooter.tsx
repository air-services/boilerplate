import React from 'react';

interface TableFooterProps {
  children: React.ReactNode;
}

const TableFooter = ({ children }: TableFooterProps) => {
  return <tfoot>{children}</tfoot>;
};

export default TableFooter;
