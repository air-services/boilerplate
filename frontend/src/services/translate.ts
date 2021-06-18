import i18n from 'i18next';

i18n.init({
  lng: 'ru',
  resources: {
    ru: {
      translation: {
        signUp: {
          EMAIL_ALREADY_EXIST: 'Такой email уже существует',
          EMAIL_WRONG_FORMAT: 'Неверный формат email',
          PASSWORD_REQUIRED: 'Необходимо ввести пароль',
          PASSWORD_SMALLER_8_SYMBOLS: 'Пароль должен быть не менее 8 символов',
          SUBMIT_BUTTON: 'Зарегистрироваться',
          PASSWORD_FIELD_LABEL: 'Пароль',
          SIGNUP_FORM_LABEL: 'Регистрация',
          EMAIL_FIELD_LABEL: 'Электронная почта',
          SIGNUP_SUCCESS_CONTENT: 'Регистрация прошла успешно!',
          SIGNUP_SUCCESS_TITLE: 'Поздравляем',
        },
      },
    },
  },
});

export default i18n;
