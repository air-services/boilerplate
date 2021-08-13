import React from 'react';
import Async from 'react-select/async';
import { FormConfigField } from 'components/ui/form/EditItem/EditItem';
import { useFormContext, Controller } from 'react-hook-form';

const AsyncSelectInput = ({
  field,
}: {
  field: FormConfigField;
  register: any;
  value: any;
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={field.id}
      render={({
        field: { onChange, onBlur, value, name, ref },
        fieldState: { invalid, isTouched, isDirty, error },
        formState,
      }) => {
        return (
          <div className="py-5">
            <Async
              defaultValue={value}
              {...field.selectConfig}
              isMulti={field.isMulti}
              onChange={onChange}
              defaultOptions
            />
          </div>
        );
      }}
    />
  );
};

export default AsyncSelectInput;
