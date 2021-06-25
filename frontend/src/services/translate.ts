import i18n from 'i18next';

i18n.init({
  lng: 'ru',
  resources: {
    ru: {
      translation: {
        signUp: {
          EMAIL_ALREADY_EXIST: 'Такой email уже существует',
          EMAIL_WRONG_FORMAT: 'Неверный формат email',
          EMAIL_FIELD_LABEL: 'Электронная почта',
          PASSWORD_REQUIRED: 'Необходимо ввести пароль',
          PASSWORD_SMALLER_8_SYMBOLS: 'Пароль должен быть не менее 8 символов',
          PASSWORD_FIELD_LABEL: 'Пароль',
          SIGNUP_FORM_LABEL: 'Регистрация',
          SIGNUP_SUCCESS_CONTENT: 'Регистрация прошла успешно!',
          SIGNUP_SUCCESS_TITLE: 'Поздравляем',
          SUBMIT_BUTTON: 'Зарегистрироваться',
        },
        logIn: {
          LOGIN_SUCCESS_TITLE: 'Поздравляем',
          LOGIN_SUCCESS_CONTENT: 'Вы успешно вошли в аккаунт',
          LOGIN_FORM_LABEL: 'Вход',
          SUBMIT_BUTTON: 'Войти',
          EMAIL_WRONG_FORMAT: 'Неверный формат email',
          EMAIL_NOT_FOUND: 'Пользователя с таким email не существует',
          EMAIL_FIELD_LABEL: 'Электронная почта',
          PASSWORD_FIELD_LABEL: 'Пароль',
          PASSWORD_WRONG: 'Неверный пароль',
          PASSWORD_REQUIRED: 'Необходимо ввести пароль',
          PASSWORD_SMALLER_8_SYMBOLS: 'Пароль должен быть не менее 8 символов',
        },
        accountSettings: {
          FORM_TITLE: 'Профиль',

          EMAIL_LABEL: 'Электронная почта',
          EMAIL_PLACEHOLDER: 'user@mail.com',

          FIRST_NAME_LABEL: 'Имя',
          FIRST_NAME_PLACEHOLDER: 'Иван',

          LAST_NAME_LABEL: 'Фамилия',
          LAST_NAME_PLACEHOLDER: 'Иванов',

          PATRONYMIC_LABEL: 'Отчество',
          PATRONYMIC_PLACEHOLDER: 'Иванович',

          FORM_SUBMIT_BUTTON: 'Обновить'
        },
      },
    },
  },
});

export default i18n;
