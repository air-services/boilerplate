import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';

import i18n from 'services/translate';
import accountApi from 'services/api/account';

import { AccountModel } from 'providers/AppContextProvider';
import styles from './AccountSettings.module.scss';
import {
  serializeToCamel,
  serializeToSnake,
} from 'services/api/serializers';
import Button from 'components/ui/Button';

const AccountSettingsLocales = {
  FORM_TITLE: 'accountSettings.FORM_TITLE',
  EMAIL_LABEL: 'accountSettings.EMAIL_LABEL',
  EMAIL_PLACEHOLDER: 'accountSettings.EMAIL_PLACEHOLDER',

  FIRST_NAME_LABEL: 'accountSettings.FIRST_NAME_LABEL',
  FIRST_NAME_PLACEHOLDER: 'accountSettings.FIRST_NAME_PLACEHOLDER',

  LAST_NAME_LABEL: 'accountSettings.LAST_NAME_LABEL',
  LAST_NAME_PLACEHOLDER: 'accountSettings.LAST_NAME_PLACEHOLDER',

  PATRONYMIC_LABEL: 'accountSettings.PATRONYMIC_LABEL',
  PATRONYMIC_PLACEHOLDER: 'accountSettings.PATRONYMIC_PLACEHOLDER',

  FORM_SUBMIT_BUTTON: 'accountSettings.FORM_SUBMIT_BUTTON',
};

const AccountSettings = ({
  account,
  updateAccount,
}: {
  account: AccountModel;
  updateAccount: any;
}) => {
  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: account.data,
  });

  const onSubmitAccountForm = useCallback((values) => {
    return accountApi.update(serializeToSnake(values)).then((response) => {
      updateAccount({
        data: { ...account.data, ...serializeToCamel(response.data) },
      });
    });
  }, []);

  return (
    <div className="p-20">
      <h1 className="pb-10 text-2xl">
        {i18n.t(AccountSettingsLocales.FORM_TITLE)}
      </h1>
      <form
        className="grid grid-cols-6"
        onSubmit={handleSubmit(onSubmitAccountForm)}>
        <div className="col-span-4">
          <fieldset className="my-10">
            <div className={styles.field}>
              <label className={styles.label}>
                {i18n.t(AccountSettingsLocales.EMAIL_LABEL)}
              </label>
              <input
                {...register('email')}
                className={styles.input}
                placeholder={i18n.t(AccountSettingsLocales.EMAIL_PLACEHOLDER)}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>
                {i18n.t(AccountSettingsLocales.FIRST_NAME_LABEL)}
              </label>
              <input
                className={styles.input}
                {...register('firstName')}
                placeholder={i18n.t(
                  AccountSettingsLocales.FIRST_NAME_PLACEHOLDER
                )}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>
                {i18n.t(AccountSettingsLocales.LAST_NAME_LABEL)}
              </label>
              <input
                className={styles.input}
                {...register('lastName')}
                placeholder={i18n.t(
                  AccountSettingsLocales.LAST_NAME_PLACEHOLDER
                )}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>
                {i18n.t(AccountSettingsLocales.PATRONYMIC_LABEL)}
              </label>
              <input
                {...register('patronymic')}
                className={styles.input}
                placeholder={i18n.t(
                  AccountSettingsLocales.PATRONYMIC_PLACEHOLDER
                )}
              />
            </div>
          </fieldset>
          <div className="form-buttons">

            <Button
              isSubmitting={isSubmitting}
              title={i18n.t(AccountSettingsLocales.FORM_SUBMIT_BUTTON)}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default AccountSettings;
