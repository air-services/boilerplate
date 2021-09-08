import React from 'react';
import TextInput from 'components/ui/form/TextInput/TextInput';
import { useFormContext } from 'react-hook-form';
import applicationCreateStyle from 'modules/applications/ApplicationCreate/ApplicationCreate.module.scss';
import Button from 'components/ui/Button/Button';
import AsyncSelectInput from 'components/ui/form/AsyncSelectInput/AsyncSelectInput';
import restApi from 'services/api/rest';
import getIconOptionLabel from 'services/helpers/getIconOptionLabel';

const ApplicationConfig = () => {
  const { register, control, getValues } = useFormContext();

  return (
    <>
      <TextInput
        field={{
          id: 'name',
          label: 'Name',
        }}
        register={register}
      />
      <TextInput
        field={{
          id: 'description',
          label: 'Description',
        }}
        register={register}
      />
      <TextInput
        field={{
          id: 'url',
          label: 'Url',
        }}
        register={register}
      />
      <AsyncSelectInput
        field={{
          id: 'icon',
          label: 'Icon',
          placeholder: 'Icon',
          render: 'MultiSelectInput',
          selectConfig: {
            getOptionValue: (option: any) => {
              return option.id;
            },
            getOptionLabel: getIconOptionLabel,
            loadOptions: (inputValue: string) => {
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
          },
        }}
        defaultValue={getValues().icon}
      />
      <div className={applicationCreateStyle.buttonsWrapper}>
        <Button buttonType="submit" title="Create application" />
      </div>
    </>
  );
};

export default ApplicationConfig;
