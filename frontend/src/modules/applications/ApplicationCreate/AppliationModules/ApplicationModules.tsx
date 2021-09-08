import React, { useCallback, useEffect } from 'react';
import applicationModuleStyle from './ApplicationModules.module.scss';
import { useFieldArray, useFormContext } from 'react-hook-form';
import Button from 'components/ui/Button/Button';

import { ApplicationModule } from 'modules/applications/ApplicationCreate/applicationModels';
import AsyncSelectInput from 'components/ui/form/AsyncSelectInput/AsyncSelectInput';
import getIconOptionLabel from 'services/helpers/getIconOptionLabel';
import restApi from 'services/api/rest';

const moduleDefaultFormState = (): ApplicationModule => ({
  name: 'Module name',
  url: 'module-url',
  api: 'module-api',
  icon: { label: 'ad', value: 'ad' },
});

const ApplicationModuleForm = ({
  index,
  module,
  remove,
}: {
  index: number;
  module: ApplicationModule;
  remove(id: number): void;
}) => {
  const { register, control } = useFormContext();
  const removeModule = useCallback(() => {
    remove(index);
  }, []);

  return (
    <div className={applicationModuleStyle.form}>
      <div className={applicationModuleStyle.remove}>
        <Button
          icon="times"
          onClickHandler={removeModule}
          buttonStyle={'danger'}
        />
      </div>

      <div className={applicationModuleStyle.formField}>
        <input
          className={applicationModuleStyle.formFieldInput}
          defaultValue={module.name}
          placeholder="Module name"
          {...register(`modules.${index}.name`)}
        />
      </div>

      <div className={applicationModuleStyle.formField}>
        <input
          className={applicationModuleStyle.formFieldInput}
          defaultValue={module.url}
          placeholder="Module url"
          {...register(`modules.${index}.url`)}
        />
      </div>

      <div className={applicationModuleStyle.formField}>
        <input
          className={applicationModuleStyle.formFieldInput}
          defaultValue={module.api}
          placeholder="Module api url"
          {...register(`modules.${index}.api`)}
        />
      </div>
      <div className={applicationModuleStyle.formField}>
        <AsyncSelectInput
          field={{
            id: `modules.${index}.icon`,
            placeholder: 'Select module icon',
            label: 'Icon',
            render: 'MultiSelectInput',
            selectConfig: {
              getOptionValue: (option: any) => {
                return option.id;
              },
              defaultValue: module.icon,
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
          defaultValue={module.icon}
        />
      </div>
    </div>
  );
};

const ApplicationModules = () => {
  const { control, getValues, setValue } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control: control,
    name: 'modules',
  });

  const appendModule = useCallback((event) => {
    event.preventDefault();
    append(moduleDefaultFormState());
  }, []);

  return (
    <div className={applicationModuleStyle.wrapper}>
      {fields.map((field: any, index: any) => {
        return (
          <ApplicationModuleForm
            key={field.id}
            module={getValues().modules[index]}
            index={index}
            remove={remove}
          />
        );
      })}
      <Button
        buttonStyle="success"
        title="Add module"
        onClickHandler={appendModule}
      />
    </div>
  );
};

export default ApplicationModules;
