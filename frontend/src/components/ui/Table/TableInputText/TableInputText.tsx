import React from 'react';
import tableInputTextStyles from './TableInputText.module.scss';

const TableInputText = (props: any) => {
  return <input className={tableInputTextStyles.main} {...props} />;
};

export default TableInputText;
