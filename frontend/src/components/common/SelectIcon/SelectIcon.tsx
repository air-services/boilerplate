import React from 'react';
import getIconOptionLabel from 'services/helpers/getIconOptionLabel';
import restApi from 'services/api/rest';
import Async from 'react-select/async';

interface SelectIconProps {
  defaultValue: { label: string; value: string } | null;
  isMulti?: boolean;
  field: {
    id: string;
    label: string;
    placeholder: string;
  };
  onChange(nextValue: any): void;
}

const SelectIcon = (props: SelectIconProps) => {
  const selectProps = {
    getOptionValue: (option: any) => {
      return option.id;
    },
    getOptionLabel: getIconOptionLabel,
    loadOptions: (inputValue: string): any => {
      return new Promise((resolve) => {
        restApi.api.icons
          .getList({
            search: [
              {
                field: 'name',
                value: inputValue,
                operator: 'like',
              },
            ],
          })
          .then((response) => {
            resolve(response.data.items);
          });
      });
    },
  };

  return (
    <Async
      defaultValue={props.defaultValue}
      isMulti={props.isMulti}
      onChange={props.onChange}
      defaultOptions
      {...selectProps}
    />
  );
};

export default SelectIcon;
