import React, {ChangeEvent, FormEvent, useEffect} from "react";
import pagesStyles from "./pages.module.css";
import {
  Input,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useHistory, useLocation} from "react-router-dom";
import {register} from "../services/actions/authActions";
import {useAppDispatch, useAppSelector} from "../services/store";
import { History, LocationState } from "history";
import {ILocationState} from "../definitions/ILocationState";
import {Button} from "../definitions/overrides/Button";
import {PasswordInput} from "../definitions/overrides/PasswordInput";

export default function RegisterPage() {
  const dispatch = useAppDispatch();

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState('');
  const {isAuthorized} = useAppSelector((store) => store.auth);
  const history: History<LocationState> = useHistory();
  const location: LocationState & ILocationState = useLocation();

  useEffect(() => {
    if (isAuthorized) {
      history.replace(location?.state?.from || '/');
    }
  }, [history, isAuthorized, location?.state?.from]);

  const onChange = (setter: (value: string) => void, e: ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value);
    setError('');
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name) {
      setError('Введите своё имя');
      return;
    }

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
    dispatch(register(email, password, name));
  };

  return (
    <section className={pagesStyles.page}>
      <div className={pagesStyles.container}>
        <h2 className={`${pagesStyles.title} text text_type_main-medium`}>
          Регистрация
        </h2>
        <form className={pagesStyles.form} onSubmit={onSubmit}>
          <div className={`${pagesStyles.p100} mt-6`}>
            <Input
              type="text"
              placeholder="Имя"
              value={name}
              onChange={(e) => onChange(setName, e)}
            />
          </div>
          <div className={`${pagesStyles.p100} mt-6`}>
            <EmailInput
              name={'email'}
              value={email}
              onChange={(e) => onChange(setEmail, e)}
            />
          </div>
          <div className={`${pagesStyles.p100} mt-6`}>
            <PasswordInput
              name={'password'}
              placeholder="Пароль"
              value={password}
              onChange={(e) => onChange(setPassword, e)}
            />
          </div>
          {error && (
              <p className={`${pagesStyles.errorText} text text_type_main-default mt-4 mb-4`}>
                {error}
              </p>
          )}
          <div className="mt-6">
            <Button type="primary" size="medium">
              Зарегистрироваться
            </Button>
          </div>
        </form>
        <p className="text text_type_main-default text_color_inactive mt-20">
          Уже зарегистрированы?
          <Link to="/login" className={pagesStyles.link}>
            Войти
          </Link>
        </p>
      </div>
    </section>
  );
}
