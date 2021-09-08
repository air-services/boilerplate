import React from 'react';
import textInputStyle from 'components/ui/form/TextInput/TextInput.module.scss';

interface TextInputField {
  id: string;
  label: string;
  placeholder?: string;
}

const TextInput = ({
  field,
  register,
}: {
  field: TextInputField;
  register: any;
}) => {
  return (
    <div className={textInputStyle.field} key={field.id}>
      <label className={textInputStyle.label}>{field.label}</label>
      <input
        {...register(field.id)}
        className={textInputStyle.input}
        placeholder={field.placeholder}
      />
    </div>
  );
};

export default TextInput;
