import React, { useCallback, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import TextInput from 'components/ui/form/TextInput/TextInput';
import CheckBoxInput from 'components/ui/form/CheckboxInput/CheckBoxInput';
import MultiSelectInput from 'components/ui/form/MultiSelectInput/MultiSelectInput';

import Button from 'components/ui/Button/Button';
import { serializeToCamel } from 'services/api/serializers';
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
  MultiSelectInput: MultiSelectInput,
};

export interface FormConfigField {
  id: string;
  label: string;
  placeholder: string;
  render: FormRender;
  selectConfig?: any;
}

export interface EditItemFormConfig {
  backUrl: string;
  title: string;
  api: RestModelApi;
  fields: any[];
  serialize: (data: any) => any;
  submitLabel: string;
  submitAndContinueEditLabel?: string;
  defaultState: () => any;
}

const EditItemForm = ({
  item,
  formConfig,
}: {
  item: any;
  formConfig: EditItemFormConfig;
}) => {
  const history = useHistory();
  const { showNotification } = useNotificationsContext();
  const formMethods = useForm({ defaultValues: item });

  const {
    register,
    handleSubmit,
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
        content: 'Обновление прошло успешно',
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

  const submitAndContinueEdit = useCallback((data) => {
    return formConfig.api
      .patchItem(data.id, formConfig.serialize(data))
      .then(() => {
        showSuccess();
      })
      .catch(showError);
  }, []);

  const onSubmitAndContinueEditHandler = useCallback((event) => {
    event.preventDefault();
    handleSubmit(submitAndContinueEdit)();
  }, []);

  const onFormSubmit = useCallback((data) => {
    return formConfig.api
      .patchItem(data.id, formConfig.serialize(data))
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
                  value={item[field.id]}
                />
              );
            })}
            <div className="form-buttons">
              <Button title={formConfig.submitLabel} />
              {formConfig.submitAndContinueEditLabel && (
                <span className="ml-5">
                  <Button
                    onClickHandler={onSubmitAndContinueEditHandler}
                    title={formConfig.submitAndContinueEditLabel}
                  />
                </span>
              )}
            </div>
          </div>
        </FormProvider>
      </form>
    </div>
  );
};

const EditItem = ({
  id,
  formConfig,
}: {
  id: string;
  formConfig: EditItemFormConfig;
}) => {
  const [item, setItem] = useState(formConfig.defaultState());

  useEffect(() => {
    formConfig.api.getItem(id).then((response: any) => {
      setItem({ isLoaded: true, data: serializeToCamel(response.data) });
    });
  }, [id]);

  return item.isLoaded ? (
    <EditItemForm item={item.data} formConfig={formConfig} />
  ) : null;
};

export default EditItem;
