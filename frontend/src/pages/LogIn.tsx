import React, { useCallback } from 'react';
import classNames from 'classnames';
import { useForm } from 'react-hook-form';

import { useHistory } from 'react-router-dom';

import { validateEmail } from 'services/validators';
import { setAccessToken } from 'services/auth';
import accountApi from 'services/api/account';
import i18n from 'services/translate';

import { useAppContext } from 'providers/AppContextProvider';
import { useNotificationsContext } from 'providers/NotificationsContextProvider';
import ProcessingSpinner from 'components/ui/ProcessingSpinner';

const validateLogInEmail = (email: string) => {
  if (!validateEmail(email)) {
    return 'EMAIL_WRONG_FORMAT';
  }

  return true;
};

const LogInLocales = {
  LOGIN_SUCCESS_TITLE: 'logIn.LOGIN_SUCCESS_TITLE',
  LOGIN_SUCCESS_CONTENT: 'logIn.LOGIN_SUCCESS_CONTENT',
  LOGIN_FORM_LABEL: 'logIn.LOGIN_FORM_LABEL',

  EMAIL_WRONG_FORMAT: 'logIn.EMAIL_WRONG_FORMAT',
  EMAIL_NOT_FOUND: 'logIn.EMAIL_NOT_FOUND',
  EMAIL_FIELD_LABEL: 'logIn.EMAIL_FIELD_LABEL',

  PASSWORD_FIELD_LABEL: 'logIn.PASSWORD_FIELD_LABEL',

  // logIn. prefix generated by form
  PASSWORD_REQUIRED: 'PASSWORD_REQUIRED',
  PASSWORD_SMALLER_8_SYMBOLS: 'PASSWORD_SMALLER_8_SYMBOLS',
  SUBMIT_BUTTON: 'logIn.SUBMIT_BUTTON',
};

const LogInPage = () => {
  const { showNotification } = useNotificationsContext();
  const { handleSubmit, register, formState, setError } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const history = useHistory();
  const { loadAccount } = useAppContext();

  const onFormSubmit = useCallback((values) => {
    return accountApi
      .logIn(values)
      .then(({ data }) => {
        setAccessToken(data.token);
        loadAccount(() => {
          showNotification(
            {
              title: i18n.t(LogInLocales.LOGIN_SUCCESS_TITLE),
              content: i18n.t(LogInLocales.LOGIN_SUCCESS_CONTENT),
            },
            () => {
              history.push('/');
            }
          );
        });
      })
      .catch((error) => {
        const formErrors = error.response.data.detail;
        Object.keys(formErrors).forEach((field: any) => {
          setError(field, { message: formErrors[field] });
        });
      });
  }, []);

  return (
    <div className="grid grid-cols-6 gap-4">
      <div className="col-start-3 col-span-2 my-36">
        <form
          className="form bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit(onFormSubmit)}>
          <h1 className="text-center pb-10 text-2xl">
            {i18n.t(LogInLocales.LOGIN_FORM_LABEL)}
          </h1>
          <fieldset>
            <div className="mb-8">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password">
                {i18n.t(LogInLocales.EMAIL_FIELD_LABEL)}
              </label>
              <input
                {...register('email', { validate: validateLogInEmail })}
                className={classNames(
                  'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline',
                  {
                    ['border-2 border-red-600']: formState.errors.email,
                  }
                )}
                type="email"
                placeholder={i18n.t(LogInLocales.EMAIL_FIELD_LABEL)}
              />
              {formState.errors.email && (
                <p className="text-red-500 text-xs italic absolute">
                  {i18n.t(`logIn.${formState.errors.email.message}`)}
                </p>
              )}
            </div>
          </fieldset>
          <fieldset className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password">
              {i18n.t(LogInLocales.PASSWORD_FIELD_LABEL)}
            </label>
            <input
              className={classNames(
                'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline',
                {
                  ['border-2 border-red-600']: formState.errors.password,
                }
              )}
              type="password"
              autoComplete="on"
              placeholder="******************"
              {...register('password', {
                required: LogInLocales.PASSWORD_REQUIRED,
                minLength: {
                  value: 8,
                  message: LogInLocales.PASSWORD_SMALLER_8_SYMBOLS,
                },
              })}
            />

            {formState.errors.password && (
              <p className="text-red-500 text-xs italic absolute">
                {i18n.t(`logIn.${formState.errors.password.message}`)}
              </p>
            )}
          </fieldset>

          <div className="flex items-center justify-between">
            <button
              className={classNames(`
                w-full
                bg-blue-500
                text-white
                font-bold
                py-2
                px-4
                rounded
                focus:outline-none
                focus:shadow-outline
                disabled:opacity-50
                disabled:cursor-auto
              `,
                { ['hover:bg-blue-700']: !formState.isSubmitting }
              )}
              disabled={formState.isSubmitting}
              type="submit">
              <div className="flex justify-center">
                {formState.isSubmitting && <ProcessingSpinner />}
                <span>{i18n.t(LogInLocales.SUBMIT_BUTTON)}</span>
              </div>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LogInPage;
