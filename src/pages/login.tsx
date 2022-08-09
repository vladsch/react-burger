import React, {ChangeEvent, FormEvent, useEffect} from "react";
import {
  EmailInput
} from "@ya.praktikum/react-developer-burger-ui-components";
import pagesStyles from "./pages.module.css";
import {Link, useHistory, useLocation} from "react-router-dom";
import { login } from "../services/actions/authActions";
import {useAppDispatch, useAppSelector} from "../services/store";
import { History, LocationState } from "history";
import {ILocationState} from "../definitions/ILocationState";
import {Button} from "../definitions/overrides/Button";
import {PasswordInput} from "../definitions/overrides/PasswordInput";

function LoginPage() {
  const dispatch = useAppDispatch();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const {loginFailed, isAuthorized} = useAppSelector((store) => store.auth);
  const history: History<LocationState> = useHistory();
  const location: LocationState & ILocationState = useLocation();

  useEffect(() => {
    if (loginFailed) {
      setError('Ошибка входа. Проверьте правильность логина и пароля.');
    } else if (isAuthorized) {
      history.replace(location?.state?.from || '/');
    }
  }, [loginFailed, isAuthorized, history, location?.state?.from]);

  const onChange = (setter: (value: string) => void, e: ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value);
    setError('');
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) {
      setError('Введите свой email');
      return;
    }

    if (!password) {
      setError('Введите свой пароль');
      return;
    }

    const invalidField = (e.target as HTMLFormElement).querySelector('.input_status_error');
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
