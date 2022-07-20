import React from "react";
import { useDispatch } from "react-redux";
import pagesStyles from "./pages.module.css";
import {
  Input,
  PasswordInput,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import {login, register} from "../services/actions/authActions";

export default function RegisterPage() {
  const dispatch = useDispatch();

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState('');

  const onChange = (setter, e) => {
    setter(e.target.value);
    setError('');
  };

  const onSubmit = (e) => {
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

    const invalidField = e.target.querySelector('.input_status_error');
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
              value={email}
              onChange={(e) => onChange(setEmail, e)}
            />
          </div>
          <div className={`${pagesStyles.p100} mt-6`}>
            <PasswordInput
              type="password"
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
