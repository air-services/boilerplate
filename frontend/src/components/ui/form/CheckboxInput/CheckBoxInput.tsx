import React from 'react';
import checkBoxStyle from 'components/ui/form/CheckboxInput/CheckBoxInput.module.scss';

const CheckBoxInput = ({field, register, value}: any) => {
  return (
    <div className={checkBoxStyle.field} key={field.id}>
      <label className={checkBoxStyle.label}>{field.label}</label>
      <input
        {...register(field.id)}
        type="checkbox" />
    </div>
  );
};

export default CheckBoxInput;