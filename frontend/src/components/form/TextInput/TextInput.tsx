import React from 'react';
import textInputStyle from './TextInput.module.scss';

const TextInput = ({field, register}: any) => {
  return (
    <div className={textInputStyle.field} key={field.id}>
      <label className={textInputStyle.label}>{field.label}</label>
      <input
        {...register(field.id)}
        className={textInputStyle.input} placeholder={field.placeholder} />
    </div>
  );
};

export default TextInput;