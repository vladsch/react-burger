import React, {useEffect} from "react";
import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import pagesStyles from "./pages.module.css";
import { Link } from "react-router-dom";
import { login } from "../services/actions/authActions";
import {useDispatch, useSelector} from "react-redux";

function LoginPage() {
  const dispatch = useDispatch();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const auth = useSelector((store) => store.auth);

  useEffect(() => {
    if (auth.loginFailed) {
      setError('Ошибка входа. Проверьте правильность логина и пароля.');
    }
  }, [auth]);

  const onChange = (setter, e) => {
    setter(e.target.value);
    setError('');
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      setError('Введите свой email');
      return;
    }

    if (!password) {
      setError('Введите свой пароль');
      return;
    }

    const invalidField = e.target.querySelector('.input_status_error');
    if (invalidField) {
      setError('Проверьте правильность заполнения полей');
      return;
    }

    setError('');
    dispatch(login(email, password));
  };

  return (
    <section className={pagesStyles.page}>
      <div className={pagesStyles.container}>
        <h2 className={`${pagesStyles.title} text text_type_main-medium`}>
          Вход
        </h2>
        <form onSubmit={onSubmit} className={pagesStyles.form}>
          <div className={`${pagesStyles.p100} mt-6`}>
            <EmailInput
                name={'email'}
                value={email}
                onChange={(e) => onChange(setEmail, e)} />
          </div>
          <div className={`${pagesStyles.p100} mt-6`}>
            <PasswordInput
                name={'password'}
                value={password}
                onChange={(e) => onChange(setPassword, e)}
                placeholder="Пароль" />
          </div>
          {error && (
              <p className={`${pagesStyles.errorText} text text_type_main-default mt-4 mb-4`}>
                {error}
              </p>
          )}
          <div className="mt-6">
            <Button type="primary" size="medium">
              Войти
            </Button>
          </div>
        </form>
        <p className="text text_type_main-default text_color_inactive mt-20">
          Вы — новый пользователь?
          <Link to="/register" className={pagesStyles.link}>
            Зарегистрироваться
          </Link>
        </p>
        <p className="text text_type_main-default text_color_inactive mt-4">
          Забыли пароль?
          <Link to="/forgot-password" className={pagesStyles.link}>
            Восстановить пароль
          </Link>
        </p>
      </div>
    </section>
  );
}

export default LoginPage;
