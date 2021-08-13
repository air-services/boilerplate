import React, { useCallback } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import TextInput from 'components/ui/form/TextInput/TextInput';
import CheckBoxInput from 'components/ui/form/CheckboxInput/CheckBoxInput';
import AsyncSelectInput from 'components/ui/form/AsyncSelectInput/AsyncSelectInput';

import Button from 'components/ui/Button/Button';
import {
  NotificationStyle,
  useNotificationsContext,
} from 'providers/NotificationsContextProvider';
import { RestModelApi } from 'services/api/rest';
import Select from 'react-select';

type FormRender =
  | 'TextInput'
  | 'CheckBoxInput'
  | 'SelectInput'
  | 'MultiSelectInput';

const FieldRenderMap = {
  TextInput: TextInput,
  CheckBoxInput: CheckBoxInput,
  SelectInput: Select,
  MultiSelectInput: AsyncSelectInput,
};

export interface FormConfigField {
  id: string;
  label: string;
  placeholder: string;
  render: FormRender;
  selectConfig?: any;
  isMulti?: boolean;
}

export interface CreateItemFormConfig {
  backUrl: string;
  title: string;
  api: RestModelApi;
  fields: any[];
  serialize: (data: any) => any;
  submitLabel: string;
  defaultValues: () => any;
}

const CreateItemForm = ({
  formConfig,
}: {
  formConfig: CreateItemFormConfig;
}) => {
  const history = useHistory();
  const { showNotification } = useNotificationsContext();
  const formMethods = useForm({ defaultValues: formConfig.defaultValues() });

  const {
    register,
    handleSubmit,
    getValues,
    formState: { isSubmitting },
  } = formMethods;

  const showError = useCallback(() => {
    showNotification(
      {
        title: 'Ошибка',
        content: 'Что-то пошло не так',
        style: NotificationStyle.danger,
      },
      null
    );
  }, []);

  const showSuccess = useCallback(() => {
    showNotification(
      {
        title: 'Успех',
        content: 'Создание прошло успешно',
        style: NotificationStyle.success,
      },
      null
    );
  }, []);

  const goBack = useCallback(() => {
    // smart go back action
    const { action } = history;
    if (action === 'PUSH') {
      history.goBack();
    } else {
      history.push(formConfig.backUrl);
    }
  }, [history]);

  const onFormSubmit = useCallback((data) => {
    return formConfig.api
      .createItem(formConfig.serialize(data))
      .then(() => {
        showSuccess();
        goBack();
      })
      .catch(showError);
  }, []);

  return (
    <div className="p-20">
      <h1 className="pb-10 text-2xl">{formConfig.title}</h1>
      <form className="grid grid-cols-6" onSubmit={handleSubmit(onFormSubmit)}>
        <FormProvider {...formMethods}>
          <div className="col-span-4">
            {formConfig.fields.map((field: FormConfigField) => {
              const FieldRenderComponent = FieldRenderMap[field.render];
              return (
                <FieldRenderComponent
                  field={field}
                  register={register}
                  key={field.id}
                />
              );
            })}
            <div className="form-buttons">
              <Button title={formConfig.submitLabel} />
            </div>
          </div>
        </FormProvider>
      </form>
    </div>
  );
};

const CreateItem = ({ formConfig }: { formConfig: CreateItemFormConfig }) => {
  return <CreateItemForm formConfig={formConfig} />;
};

export default CreateItem;
