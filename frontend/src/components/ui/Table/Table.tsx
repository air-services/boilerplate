import React from 'react';

import tableStyles from './Table.module.scss';

interface TableProps {
  children: React.ReactNode | React.ReactChildren | React.ReactNode[];
}

const Table = ({ children }: TableProps) => {
  return <table className={tableStyles.main}>{children}</table>;
};

export default Table;
