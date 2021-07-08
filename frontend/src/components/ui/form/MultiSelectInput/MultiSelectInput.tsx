import React from 'react';
import Async from 'react-select/async';
import { FormConfigField } from 'components/ui/EditItem/EditItem';
import multiSelectStyle from 'components/ui/form/MultiSelectInput/MultiSelectInput.module.scss';
import { useFormContext, Controller } from 'react-hook-form';

const MultiSelectInput = ({
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
          <div className={multiSelectStyle.wrapper}>
            <Async
              defaultValue={value}
              {...field.selectConfig}
              isMulti={true}
              onChange={onChange}
              defaultOptions
            />
          </div>
        );
      }}
    />
  );
};

export default MultiSelectInput;
