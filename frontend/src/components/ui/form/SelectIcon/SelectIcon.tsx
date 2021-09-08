import React from 'react';
import Async from 'react-select/async';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Controller } from 'react-hook-form';

const getOptionLabel: any = ({ value }: any) => {
  return (
    <div>
      <span className="mr-2">{value}</span>
      <FontAwesomeIcon className="mr-2 text-sm" icon={value} />
    </div>
  );
};

const SelectIcon = ({ field, control, defaultValue }: any) => {
  return (
    <Controller
      control={control}
      name={field.id}
      {...(defaultValue ? { defaultValue } : {})}
      render={({
        field: { onChange, onBlur, value, name, ref },
        fieldState: { invalid, isTouched, isDirty, error },
        formState,
      }) => {
        return (
          <div className="py-5">
            {field.label && (
              <label className="block text-gray-700 text-sm font-bold mb-2">
                {field.label}
              </label>
            )}
            <Async
              getOptionLabel={getOptionLabel}
              onChange={onChange}
              {...(field.placeholder ? { placeholder: field.placeholder } : {})}
              {...(defaultValue ? { defaultValue } : {})}
            />
          </div>
        );
      }}
    />
  );
};

export default SelectIcon;
